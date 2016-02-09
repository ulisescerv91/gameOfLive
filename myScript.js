// Array que contien el estado actual de las celulas
var arrayX=new Array();
var arrayY=new Array();
//Array temporal para guardar el estado futuro de las celulas
var tempArray=new Array();
var tempArray2=new Array();
//Tablero
var filas=9;
var columnas=9;
//Variabe para conocer el numero de vecinos que tiene cada celula
var numeroVecinos;


//llenar TABLERO
var iniciar=function(){
	//llenar el tablero
	for (var row=0; row <= filas; row++) {
		for (var column=0 ;column <= columnas; column++) {
			//posibilidades 50% de nacer viva o no
			if(parseInt(Math.random()*10)>5 )
				arrayY[column] = 1;
			else 
				arrayY[column] = 0;
		};
		//llenamos array principal
		arrayX[row] = arrayY;
		//Imprimir el Array Con el que inicia el juego
		console.log(arrayX[row]);
		//limpiamos array 
		arrayY=[];
	};
}
//Mandamos llamar la funcion para iniciar el tablero
iniciar();

//FUNCION para conocer el valor que tiene la celula
var valorCerlda=function(x,y){
	return arrayX[x][y]
}

//FUNCION para buscar numero de vecinos que tiene cada celula
var vecinos=function(x,y){
	/*
		VECINOS DE LA POSICION ENVIADA
		______________________________________
		| [x-1][y-1] |  [x-1][y] | [x-1][y+1] |
		|____________|___________|____________|    
		|  [x][y-1]  |   [X][Y]  |  [x][y+1]  |
		|____________|___________|____________|
		| [x+1][y-1] |  [x+1][y] | [x+1][y+1] |
		|____________|___________|____________|
	*/
	//cada celula tiene 8 vecinos por tnato son maximo 8 IF
	numeroVecinos=0;
	//este es para asegurar que los campos no estan en las orillas del tablero para no tener problemas al buscar a los vecinos
	if( filas>x>0 && columnas>y>0 ){
		//vecino1
		if( valorCerlda((x-1),(y-1))==1 )
			numeroVecinos++;
		//vecino2
		if( valorCerlda((x-1),y)==1 )
			numeroVecinos++;
		//vecino3
		if( valorCerlda( (x-1),(y+1) )==1 )
			numeroVecinos++;
		//vecino4
		if( valorCerlda(x,y-1)==1 )
			numeroVecinos++;
		//vecino5
		if( valorCerlda(x,y+1)==1 )
			numeroVecinos++;
		//vecino6
		if( valorCerlda(x+1,y-1)==1 )
			numeroVecinos++;
		//vecino7
		if( valorCerlda(x+1,y)==1 )
			numeroVecinos++;
		//vecino8
		if( valorCerlda(x+1,y+1)==1 )
			numeroVecinos++;
	}else {
		alert("mal")
	}
	//console.log('V: '+numeroVecinos	)
	return numeroVecinos;
}

//FUNCION determinar si la posicion que se manda llamar tendra que morir o vivir
var vivir_morir=function(nVecinos,estado){
	//Si no muere por superPoblacion o aislamiento 
	if ( nVecinos>1 && nVecinos <4 )
		//una vez pasando la anterior unica manera de que el estado de la celula muera es que esta este muerta
		if(nVecinos==2 && estado==0)
			return 0
		else 
			//cuando es igual a 3, o tiene 2 vecinos pero esta viva 
			return 1
	else
		//Muere por sobrepoblacion o aislamiento
		return 0
}

//Funcion para Ver el cambio paso a paso
var loop=function(){
	//copiamos el array Original
	tempArray=arrayX.slice();
	//Recorremos cada posicion del Array Principal
	for (var row=1; row <filas; row++) {
		tempArray2[0]=0
		tempArray2[9]=0

		for (var column=1 ;column <columnas; column++) {
			//Numero de vecinos de la posicion actual
			n=vecinos(row,column);
			//conocer si morira o vivira para el proximo ciclo
			m=vivir_morir(n,valorCerlda(row,column))
			//escribir en el array temporal
			tempArray2[column]=m;		
			// if(m==1)
			// 	console.log('VIVE--'+n);
			// else
			// 	console.log('MUERE--'+n);
		};
		//pasamos la nueva informacion de como se vera una vez termine de hacer el recorrido por todo el tablero
		tempArray[row]=tempArray2;
		//limpiamos variable
		tempArray2=[];
	};
	//imprimimos para comparar con el principal VS el proxima vista
	// console.log('ORIGINAL')
	// for (var row=0; row <filas; row++) 
	// 	//for (var column=0 ;column <columnas; column++)
	// 		console.log(arrayX[row])
	// // tempArray=arrayX;
	// console.log('TEMPORAL')
	// for (var row=0; row <filas; row++) 
	// 	//for (var column=0 ;column <columnas; column++)
		console.log(tempArray[row])
	//NUEVO
	arrayX=tempArray.slice();
	console.log('NUEVO')
	for (var row=0; row <filas; row++) 
		//for (var column=0 ;column <columnas; column++)
			console.log(arrayX[row])
}



//BOTON NEW STEP
var step=document.getElementById('step')
//asignamos el evento para el nuevo loop
step.addEventListener('click', function(){
	loop();
});