#! /bin/bash

echo Inserisci il nome del file senza estensione
read -r libro

pdftk $libro.pdf burst output pagina_%d.pdf

echo Inserisci il numero che leggi
pdftk $libro.pdf dump_data | grep NumberOfPages
read -r n

echo "" | ps2pdf -sPAPERSIZE=a4 - b.pdf


let mod=$n%4

if [ $mod -eq 3 ]
then
let n=n+1
cp b.pdf pagina_$n.pdf
fi

if [ $mod -eq 2 ]
then
let n=n+1
cp b.pdf pagina_$n.pdf 

let n=$n+1
cp b.pdf pagina_$n.pdf
fi

if [ $mod -eq 1 ]
then
let n=$n+1
cp b.pdf pagina_$n.pdf

let n=$n+1
cp b.pdf pagina_$n.pdf

let n=$n+1
cp b.pdf pagina_$n.pdf
fi


# qualsiasi sia il valore iniziale a questo punto n sarà un multiplo di 4

let meta=n/2
a=1
let b=$meta+$a
let c=$b+1
let d=$a+1

pdftk pagina_$a.pdf pagina_$b.pdf pagina_$c.pdf pagina_$d.pdf cat output p0.pdf
rm  pagina_$a.pdf pagina_$b.pdf pagina_$c.pdf pagina_$d.pdf

let volte=meta/2 -1

let def=$volte-1

for ((k=1;k<volte;k++))
do
let a=2*k+1
let b=$meta+$a
let c=$b+1
let d=$a+1
let p=$k-1
pdftk p$p.pdf pagina_$a.pdf pagina_$b.pdf pagina_$c.pdf pagina_$d.pdf cat output p$k.pdf
rm p$p.pdf pagina_$a.pdf pagina_$b.pdf pagina_$c.pdf pagina_$d.pdf
echo $k di $def
done

mv p$def.pdf File_Impaginato.pdf
rm b.pdf doc_data.txt

