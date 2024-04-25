const btnNumbers = document.getElementsByName('data-number');
const operator = document.getElementsByName('operator');
const equal = document.getElementsByName('equal')[0];
const punto = document.getElementsByName('punto')[0];
const borrar = document.getElementsByName('erase');
let result = document.getElementById('result');
let opeActual = '';
let opeAnterior = '';
let operacion = undefined;

btnNumbers.forEach( btn => {
    btn.addEventListener('click', function(){
        addNumero(btn.innerHTML);
    });
});

operator.forEach( op => {
    op.addEventListener('click', function(){
        addOperator(op.innerHTML);
    })
});

equal.addEventListener('click', function(){
    outputResult();
    updateDisplay();
});

borrar.forEach(btn => {
    btn.addEventListener('click', function(e){
        clear(e.target);
    })
});

punto.addEventListener('click', function(){
    addNumero(punto.innerHTML);
    // alert(punto.innerHTML);
})

const clear = button => {
    // console.log(button.innerHTML);
    if(button.innerHTML === 'C'){
        opeActual = '';
        opeAnterior = '';
        operacion = undefined;
        updateDisplay();
    }else{
        opeActual = opeActual.substring(0, opeActual.length - 1);
        updateDisplay();
    }
}

const addOperator = (op) => {
    if(op === '') return;
    if(opeAnterior !== ''){
        outputResult();
    } 
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

const outputResult = () => {
    let calculo;
    const anterior = parseFloat(opeAnterior);
    const actual = parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual)) return;
    switch(operacion){
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual;
            break;
        case 'x':
            calculo = anterior * actual;
            break;
        case '/':
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    opeActual = calculo.toString();
    operacion = undefined;
    opeAnterior = '';
    // updateDisplay();
}

const addNumero = (num) => {
    console.log(opeActual.substring(opeActual.length - 1))
    if(num === '.'){
        if(opeActual === '') return;
        if(opeActual !== '' && opeActual.substring(opeActual.length - 1) === '.') return;
        opeActual = opeActual.toString() + num.toString();
        updateDisplay();
        
    }else{
        opeActual = opeActual.toString() + num.toString();
        updateDisplay();
    }
}

const updateDisplay = () => {
    result.value = opeActual;
}