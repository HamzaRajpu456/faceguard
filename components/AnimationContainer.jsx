export const container = (delay)=>(
    {
        hidden:{x: -100, opacity:0},
        visible:{
            x:0,
            opacity:1,
            transition:{duration:0.5,delay: delay}
        }
    }
)