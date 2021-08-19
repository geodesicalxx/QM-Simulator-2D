precision highp float;
#if __VERSION__ == 300
#define texture2D texture
in vec2 fragTexCoord;
out vec4 fragColor;
#else
#define fragColor gl_FragColor
varying highp vec2 fragTexCoord;
#endif
uniform float dx;
uniform float dy;
uniform float dt;
uniform float w;
uniform float h;
uniform float m;
uniform float hbar;
uniform float rScaleV;
uniform sampler2D texPsi;
uniform sampler2D texV;
uniform int laplacePoints;


float imagValueAt(vec2 location) {
    vec4 tmp = texture2D(texPsi, location);
    return tmp.g*tmp.a;
}


float getDiv2ImPsi(float imPsi) {
    float u = imagValueAt(fragTexCoord + vec2(0.0, dy/h));
    float d = imagValueAt(fragTexCoord + vec2(0.0, -dy/h));
    float l = imagValueAt(fragTexCoord + vec2(-dx/w, 0.0));
    float r = imagValueAt(fragTexCoord + vec2(dx/w, 0.0));
    // Reference for different Laplacian stencil choices:
    // Wikipedia contributors. (2021, February 17)
    // Discrete Laplacian Operator 
    // 1.5.1 Implementation via operator discretization
    // https://en.wikipedia.org/wiki/Discrete_Laplace_operator
    // #Implementation_via_operator_discretization
    if (laplacePoints <= 5) {
        return (u + d + l + r - 4.0*imPsi)/(dx*dx);
    } else {
        float ul = imagValueAt(fragTexCoord + vec2(-dx/w, dy/h));
        float ur = imagValueAt(fragTexCoord + vec2(dx/w, dy/h));
        float dl = imagValueAt(fragTexCoord + vec2(-dx/w, -dy/h));
        float dr = imagValueAt(fragTexCoord + vec2(dx/w, -dy/h));
        return (0.25*ur + 0.5*u + 0.25*ul + 0.5*l + 
                0.25*dl + 0.5*d + 0.25*dr + 0.5*r - 3.0*imPsi)/(dx*dx);
    }
}

void main () {
    float V = (1.0 - rScaleV)*texture2D(texV, fragTexCoord).r + 
                rScaleV*texture2D(texV, fragTexCoord).g;
    float imV = texture2D(texV, fragTexCoord).b;
    vec4 psi = texture2D(texPsi, fragTexCoord);
    float rePsi = psi.r;
    float imPsi = psi.g;
    float alpha = psi.a;
    float div2ImPsi = getDiv2ImPsi(imPsi);
    // rePsi2 - rePsi1
    //    = re(-i*dt/hbar*(T(psi) + (V_re + i*V_im)*(rePsi + i*imPsi)))
    // rePsi2 - rePsi1
    //    = re(-i*dt/hbar*(T(psi) + V_re*rePsi - V_im*imPsi
    //                     + i*V_re*imPsi + i*V_im*rePsi))
    // rePsi2 - rePsi1
    //    = re(dt/hbar*(-i*T(psi) - i*V_re*rePsi + i*V_im*imPsi
    //                     + V_re*imPsi + V_im*rePsi))
    // rePsi2 - rePsi1 
    //    = dt/hbar*(T(imPsi1) + V_re*imPsi + V_im*(rePsi1 + rePsi2))
    // rePsi2 - dt/hbar*V_im*rePsi2
    //    = dt/hbar*(T(imPsi1) + V_re*imPsi + V_im*(rePsi1)) + rePsi1
    // (1 - dt*V_im/hbar)*rePsi2
    //    = dt/hbar*(T(imPsi1) + V_re*imPsi + V_im*(rePsi1)) + rePsi1
    // rePsi2 = dt/(hbar*(1 - dt*V_im/hbar))
    //          *(T(imPsi1) + V_re*imPsi + V_im*(rePsi1))
    //          + rePsi1/(1 - dt*V_im/hbar)
    // rePsi2 = dt/(hbar*(1 - dt*V_im/hbar))*HimPsi 
    //          + dt/(hbar*(1 - dt*V_im/hbar))*V_im*(rePsi1)
    //          + rePsi1/(1 - dt*V_im/hbar)
    // rePsi2 = dt/(hbar*(1 - dt*V_im/hbar))*HimPsi
    //          + ((dt*V_im/hbar)*rePsi1 + rePsi)/(1 - dt*V_im/hbar)
    float hamiltonImPsi = -(0.5*hbar*hbar/m)*div2ImPsi + V*imPsi;
    float f1 = 1.0 - dt*imV/hbar;
    float f2 = 1.0 + dt*imV/hbar;
    fragColor = vec4(rePsi*(f2/f1) + hamiltonImPsi*dt/(f1*hbar), imPsi, 
                     0.0, alpha);
}