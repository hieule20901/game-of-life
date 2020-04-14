	"use strict";
/*
	Hieu Van Le
	CISC 131
	December 12th

	Game of life
*/
window.onload=function()
{
	var gameBoardArray;
	var tempArray;
	gameBoardArray = create2dArray(100, 100, 0);
	tempArray = copy2dArray(gameBoardArray);
	createGameBoard(document.getElementById('gameBoard'), gameBoardArray);
	createFirstGeneration(gameBoardArray);
	setInterval(applyRules,10,gameBoardArray,tempArray);
}

//get dead value
function getDeadValue()
{
	return 0;
}

//get live value
function getLiveValue()
{
	return 1;
}

//check if the cell is alive
function isAlive(cell)
{
	return (cell===1);
}

//get live color
function getLiveColor()
{
	return "black";
}

//get dead color
function getDeadColor()
{
	return "white";
}

//check if the cell is in the array
function isInArray(array2d, row, col)
{
	return (array2d[row][col]!==undefined)
}

//create two-dimension array
function create2dArray(rows, columns, initialValue)
{
	var array2d;
	var i;
	var j;
	array2d = new Array(rows);
	for(i=0; i<array2d.length; i++)
	{
		array2d[i] = new Array(columns);
	}
	for(i=0; i<array2d.length; i++)
	{
		for(j=0; j<array2d[i].length; j++)
		{
			array2d[i][j] = initialValue;
		}
	}
	return array2d;
}

// copy two-dimension array
function copy2dArray(array)
{
	var res;
	var i;
	var j;
	res = new Array(array.length);
	for(i=0; i<array.length; i++)
	{
		res[i] = new Array(array[i].length);
	}
	for(i=0; i<array.length; i++)
	{
		for(j=0; j<array[i].length; j++)
		{
			res[i][j] = array[i][j]
		}
	}
	return res;
}

//remove whitespaces
function trim(data)
{
	var result;
	var start;
	var end;
	var whitespace;
	if (data===data+"")
	{
		whitespace=" \n\r\t\f";
		start=0;
		while(start<data.length && whitespace.indexOf(data.charAt(start))>=0)
		{
			start=start+1;
		}
		end = data.length-1;
		while (end>=0 && whitespace.indexOf(data.charAt(end))>=0)
		{
			end=end-1;
		}

		if (end<start)
		{
			result="";
		}
		else
		{
			result=data.substring(start,end + 1);
		}

	}
	else
	{
		result=data;
	}
	return result;
}

//create HTML element
function createHTMLElement(elementType, id, classInfo, content)
{
	elementType=trim(elementType);
	id=trim(id);
	classInfo=trim(classInfo);
	if (elementType===null) { elementType=""; }
	if (id===null || id==="") { id=""; }
		else id=" id=\""+id+"\" ";
	if (classInfo===null || classInfo==="") {classInfo="";}
		else classInfo=" class=\""+classInfo +"\"";
	return '<' + elementType + id + classInfo + '>' + content + '</' + elementType + '>';

}

//create game board
function createGameBoard(containerElement, array2d)
{
	var hold;
	var i;
	var j;
	hold = "";
	for(i = 0; i<array2d.length; i++)
	{
		for(j=0; j<array2d[i].length; j++)
		{

			if(i===0)
			{
				if(j===array2d.length-1) hold = hold + createHTMLElement("div", "r"+i+"c"+j, "cell firstRow lastColumn", "")
				else hold = hold + createHTMLElement("div", "r"+i+"c"+j, "cell firstRow", "")
			}
			else
			{
				if(j===0) hold = hold + createHTMLElement("div", "r"+i+"c"+j, "cell newRow", "")
				else if (j===array2d.length-1) hold = hold + createHTMLElement("div", "r"+i+"c"+j, "cell lastColumn", "")
					else hold = hold + createHTMLElement("div", "r"+i+"c"+j, "cell", "")
			}
		}
	}
	containerElement.innerHTML = hold;
}

//create first generation
function createFirstGeneration(array2d)
{
	var i;
	var j;
	var k;
	var row;
	var col;
	var element;
	for(i=0; i<array2d.length; i++)
		for(j=0; j<array2d.length; j++)
		{
			if((i+j)%2==0)
				{
					array2d[i][j] = getLiveValue();
					element = document.getElementById("r"+i+"c"+j);
					element.style.backgroundColor = getLiveColor();
				}
		}
}

//count living neighbor of a cell
function countLivingNeighborsOf(array2d, row, col)
{
	var i;
	var j;
	var count;
	count = 0;
	for(i=row-1; i<=row+1; i++)
		if(i>=0 && i<array2d.length)
			for(j=col-1; j<=col+1; j++)
				if(j>=0 && j<array2d[i].length)
					if(i!==row || j!==col)
						if(array2d[i][j]===1)
							count = count + 1;
	return count;
}

//apply rules
function applyRules(array2d, tempArray)
{
	var i;
	var j;
	var element;
	for(i=0; i<array2d.length; i++)
	{
		for(j=0; j<array2d[i].length; j++)
		{
			tempArray[i][j]=countLivingNeighborsOf(array2d, i, j);
		}
	}
	for(i=0; i<array2d.length; i++)
	{
		for(j=0; j<array2d[i].length; j++)
		{
			element = document.getElementById("r"+i+"c"+j);
			if(array2d[i][j]===1)
			{
				if(tempArray[i][j]<2 || tempArray[i][j]>3)
				{
					array2d[i][j]=0;
					element.style.backgroundColor = getDeadColor();
				}
			}
			else {
				if(tempArray[i][j]===3)
				{
					array2d[i][j]=1;
					element.style.backgroundColor = getLiveColor();
				}
			}
		}
	}
}
