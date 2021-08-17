/**
 * Programming challenge
 * Create a function which takes a number and returns the name of the number in English
 * as a lowercase string. The function should support at least the numbers +- 2 Quadrillion
 * as well as positive and negative infinity.
 * 
 * @challenger mimshwright
 * @author Gustavo
 * @version 1.0.0
 */

const number = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
];
  
const tenth = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];
  
function factorCount(n, array, j) {
      
      array.unity = n%10;
      array.tenth = n % 100 - array.unity;
      array.hundred = n % 1000 - array.tenth - array.unity;
      array.thousand = parseInt(n / 1000);
      if ( n < 1 ) array.thousand = "";
      while(parseInt(n/1000) >= 1000) {
      n = n/1000;
        j++;
      }
      
      if ( j == 1 ) {
          array.million = parseInt(n/1000);
          array.thousand = parseInt(n - array.million*1000);
      }
      
      if ( j == 2 ) {
          array.billion = parseInt(n/1000);
          array.million = parseInt(n - array.billion*1000);
        array.thousand = parseInt(n*1000 - array.billion*10**6 - array.million*1000);
      }
      
      if ( j == 3 ) {
          array.trillion = parseInt(n/1000)
        array.billion = parseInt(n - array.trillion*1000);
          array.million = parseInt(n*1000 - array.trillion*10**6 - array.billion*1000);
        array.thousand = parseInt(n*10**6 - array.trillion*10**9 - array.billion*10**6 - array.million*1000);
      }
      
      if ( j == 4 ) {
          array.quadrillion = parseInt(n/1000)
        array.trillion = parseInt(n - array.quadrillion*1000)
        array.billion = parseInt(n*1000 - array.quadrillion*10**6 - array.trillion*1000);
          array.million = parseInt(n*10**6 - array.quadrillion*10**9 - array.trillion*10**6 - array.billion*1000);
        array.thousand = parseInt(n*10**9 - array.quadrillion*10**12 - array.trillion*10**9 - array.billion*10**6 - array.million*1000);
      }
    
    array.tern = array.hundred + array.tenth + array.unity;
  
    return j;
    
}
  
/**
 * Function receives a 3-digit number and translates to number in full
 */
function ternRead(n) {
      
    var s = n.toString();
  
    var decimal = s.split('.');
    s = decimal[0];
  
    var format = '';
  
    console.log('s' + s.length);
  
    // Means we only have a unit
    if ( s.length == 1 ) {
      format = number[s[0]];
    }
  
    if ( s.length == 2 ) {
  
        if ( s[1] == 0 ) format = tenth[s[0]];               
        else format = tenth[s[0]] + '-' + number[s[1]]; 
  
        if ( s[0] == 1 && s[1] != 0 ) format = number[n]; 
  
    }
  
    if ( s.length == 3 ) {
  
        if ( s[1] == 0 ) {
  
            if( s[2] != 0 ) format = number[s[0]] + ' hundred and ' + number[s[2]];
        else format = number[s[0]] + ' hundred';
  
        }
        else {
  
            if ( s[2] == 0 ) format = number[s[0]] + ' hundred and ' + tenth[s[1]];
            else {
  
                if ( s[1] != 1 ) format = number[s[0]] + ' hundred and ' + tenth[s[1]] + '-' + number[s[2]];
                else format = number[s[0]] + ' hundred and ' + number[s[1]+s[2]];
  
            }
        }
  
    }
  
    if ( decimal[1] > 0 ) {
      format += ' point';
  
      for ( let i = 0; i < decimal[1].length; i++ ) {
        format += ' ' + number[decimal[1][i]];
      }
  
    }
  
    console.log('Format:' + format);
    
    return format;
}
  
function readNum(array, j, english) {
    
    if ( array.quadrillion != "" ) english += ternRead(array.quadrillion) + ' quadrillion ';
    if ( array.trillion != "" ) english += ternRead(array.trillion) + ' trillion ';
    if ( array.billion != "" ) english += ternRead(array.billion) + ' billion ';
    if ( array.million != "" ) english += ternRead(array.million) + ' million ';
    if ( array.thousand != "" ) english += ternRead(array.thousand) + ' thousand ';
    
    if ( english.length > 1 && english != 'zero' && english != 'negative ' && array.hundred == '0' && array.tern != "" ) english += 'and ';
    
    if ( array.tern != "" ) english += ternRead(array.tern);
    
    console.log(english);
    if ( english[english.length-1] == ' ' ) {
      english = english.split('');
      delete english[english.length-1];
      english = english.join('');
    }
    console.log(english.length);
    
    return english;
    
}
  
function numberToEnglish(n) {
    
    var array = {quadrillion:"", trillion:"", billion:"", million:"", thousand:"", hundred:"", tenth:"", unity:"", tern:""}; // array = [thousands, hundreds, tenths, unit, decimal]
    var j = 0;
    var english = '';
    
    if ( n < 0 ) {
      n = n * -1;
      english += 'negative ';
    }
    
    if ( n == Infinity ) {    
      english += 'infinity';
      return english;
    }
    
    if ( n == 0 ) return 'zero';
    
    console.log('Number: ' + n);
    console.log('Reading: ' + english);
    
    j = factorCount(n, array, j);
    console.log('Number: ' + n);
    console.log('Reading: ' + english);
    console.log(array);
    
    english = readNum(array, j, english);
    console.log('Number: ' + n);
    console.log('Reading: ' + english);
    
    
    if (isNaN(n)) throw 'Error: Invalid number';
    
    return english;
}