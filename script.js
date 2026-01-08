// coefficient of viscosity = v
// coefficient of viscosity from theory= vt
let i=0;
let vt_water_el= document.querySelector('.cv_water')
let d_water_el= document.querySelector('.d_water')
let rt_el= document.querySelector('.rt')

let vt_water=null,d_water=null,rt=null;
let val,inp;

let w_el= document.querySelector('.w') ;
let w1_el= document.querySelector('.w1'); 
let X_el= document.querySelector('.X') ;

let w2_el=document.querySelectorAll(".w2")
let Y_el=document.querySelectorAll('.Y')
let d_sugar_el=document.querySelectorAll(".ds")
let dst2_el=document.querySelectorAll('.ds3')
// console.log(`${vt_water.value}`);

// document.querySelectorAll('.box input').forEach(input=>{
//     input.disabled=true;

// })

const eraser = function (val,input_lists) {
    
    input_lists.forEach(input=> {
            input.value="";
            input.disabled = false;
        })
    // console.log(val);
    
    val.forEach(td => {
        if (
            td.classList.contains('X') ||
            td.classList.contains('Y') ||
            td.classList.contains('ds') ||
            td.classList.contains('ds3') ||
            td.classList.contains('md') ||
            td.classList.contains('v_sugar')           
        ) {
            td.textContent = "";
            
        }
    });
};

let vt_water_value=0;
document.querySelector('.result-next').addEventListener('click', () => {
    rt=Number(rt_el.value)
    d_water=Number(d_water_el.value).toFixed(5)
    vt_water=Number(vt_water_el.value).toFixed(2)
    document.querySelectorAll('.results input').forEach(input => {
        input.disabled = true;
    });
    dst2_el[0].textContent=d_water;
    document.querySelector('.v_sugar').textContent=vt_water;
    console.log(d_water);
});

document.querySelector('.results .reset').addEventListener('click',()=>{
    
    inp=document.querySelectorAll('.results input')
    inp.forEach(input=> {
            input.value="";
            input.disabled = false;
        })
    document.querySelector('.v_sugar').textContent=''
    dst2_el[0].textContent='';
})

// table 1 module



let tr1=[];
let Y=[],w2=[],d_sugar=[];
document.querySelector('.evaluate-table1-module').addEventListener('click', () => {
    w=+Number(w_el.value).toFixed(4)
    w1=+Number(w1_el.value).toFixed(4)
    document.querySelectorAll('.table1-module input').forEach(input => {
        input.disabled = true;
    });
    X_el.textContent=+(w1-w).toFixed(4)
    X=Number(X_el.textContent)
    // tr1=document.querySelectorAll('.table1 tr:not(:first-child)')
    // tr1.shift()
    console.log(X);
    
    
    // dst2_el[0].textContent=d_water;

    for(i=0;i<w2_el.length;i++){
        Y_el[i].textContent=((+Number(w2_el[i].value).toFixed(4))-w).toFixed(4)
        Y.push(Number(Y_el[i].textContent))

        d_sugar_el[i].textContent=(((Y[i])*d_water)/X).toFixed(5)
        d_sugar.push(Number(d_sugar_el[i].textContent))
        // console.log(d_sugar);
        dst2_el[i+1].textContent=d_sugar[i]
    }

        
    console.log(d_sugar)
    // document.querySelector('.v-water-theory').textContent=vt_water;
    // console.log(d_water);
});

document.querySelector('.table1-module .reset').addEventListener('click',()=>{
    val=document.querySelectorAll('.table1-module td')
    inp=document.querySelectorAll('.table1-module input')
    eraser(val,inp)
    tr1=[];
    Y=[],w2=[],d_sugar=[];

    for(i=1;i<5;i++){
        // console.log(d_sugar);
        dst2_el[i].textContent=''
    }

})
// md for mean number of drops
let drops,nw,ns=[],v_sugar=[];
document.querySelector('.evaluate-table2-module').addEventListener('click', () => {
    // w=Number(w.value)
    // w1=Number(w1.value)
    document.querySelectorAll('.table2-module input').forEach(input => {
        input.disabled = true;
    });
    
    let md_el=document.querySelectorAll(`.md`);

    let sum,mean;
    for(i=0;i<5;i++){
        sum=0
        drops=document.querySelectorAll(`.sp${i} input`)
        drops.forEach(input=>{
            sum+=Number(input.value)
        })
        mean=+(sum/3).toFixed(2);
        md_el[i].textContent=mean;
        if (i==0){
            nw=Number(md_el[i].textContent)
        }
        else{
            ns.push(Number(md_el[i].textContent))
        }
    }
    let v_sugar_el=document.querySelectorAll('.v_sugar')
    let v_solution=0
    for(i=0;i<4;i++){
        v_solution = +((ns[i]/nw) * (d_sugar[i]/d_water)*vt_water).toFixed(3)
        v_sugar_el[i+1].textContent=v_solution 
        v_sugar.push(v_solution);
    }    
    console.log(v_sugar);
})
document.querySelector('.table2-module .reset').addEventListener('click',()=>{
    val=document.querySelectorAll('.table2-module td')
    inp=document.querySelectorAll('.table2-module input')
    eraser(val,inp)
    ns=[],v_sugar=[]
})
// v_solution = nw/ns[i] * ds[i+1]/dw
let chartInstance=null
let labels=[],data=[];
const chart= function(){
    const ctx = document.getElementById("myChart");
    
    if (v_sugar[3]<=v_sugar[0]){
        labels=["0%","Unknown","4%", "8%", "12%"];
        data=[vt_water,d_sugar[3],v_sugar[0],v_sugar[1],v_sugar[2]]
    }
    else if(v_sugar[3]<=v_sugar[1]){
        labels=["0%","4%","Unknown", "8%", "12%"];
        data=[vt_water,d_sugar[0],v_sugar[3],v_sugar[1],v_sugar[2]]
    }
    else if(v_sugar[3]<=v_sugar[2]){
        labels=["0%","4%", "8%","Unknown", "12%"];
        data=[vt_water,v_sugar[0],v_sugar[1],v_sugar[3],v_sugar[2]]
    }
    else{
        labels=["0%","4%", "8%", "12%","Unknown"];
        data=[vt_water,d_sugar[0],v_sugar[1],v_sugar[2],v_sugar[3]]
    }

    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance=new Chart(ctx, {
    type: "line",
    data: {
        labels:  labels,
        datasets: [{
        label: "Coefficient of Viscosity",
        data: data,
        borderWidth: 2,
        borderColor: "green",
        tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
        y: {
            beginAtZero: false
        }
        }
    }
    });
    console.log(labels);
}
chart()
document.querySelector('.module-graph').addEventListener('click',chart)
// chart(d_water,d_sugar);

// RESET function





let modules=["results","table1-module","table2-module"]

// modules.forEach(module=> {


//     document.querySelector(`.${module} .reset`).addEventListener('click',function(){
        
//         let input_lists= document.querySelectorAll(`.${module} input`)
//         input_lists.forEach(input=> {
//             input.value="";
//             input.disabled = false;
//         })
//         let n=modules.indexOf(module)
//          let val= document.querySelectorAll(`.${module} td`)
//          eraser(val)
//         for(i=n;i<modules.length;i++){
//             val=document.querySelectorAll(`.${modules[i]} td`)
//             eraser(val)
//             if (document.querySelectorAll(`.${modules[i]}`).classList.contains(`table1-module`)){
//                 tr1=[];
//                 Y=[],w2=[],d_sugar=[];
//             }
//             if (document.querySelectorAll(`.${modules[i]}`).classList.contains(`table2-module`))
//                 ns=[],v_sugar=[]
//         }  
//         })


//     })

// document.querySelector('.reset-graph').addEventListener('click',chart)

// labels.push('-')
document.querySelector('.table3-module .action').addEventListener('click',function(){
    let unknown_posn=labels.indexOf("Unknown")
    labels.push('-')
    console.log(labels);
    if (document.querySelector('.table2-module .md').textContent !="" &&
        document.querySelector('.table1-module .ds').textContent !="" &&
        rt != null && vt_water != null && d_water != null
        ){
            let unknown_posn=labels.indexOf("Unknown")
            document.querySelector('.table3-module span').textContent=`The concentration of unknown solution lies between ${labels[unknown_posn-1]} and ${labels[unknown_posn+1]}`
            // labels.push("-")
            document.querySelector(".table3-module .action").disabled = true;
        }
    
})
