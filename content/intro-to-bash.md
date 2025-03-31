`Bash is a shell, or commend language interpreter, for the GNU operating system`

Example. `$USER` and `$PWD` are variables

* `echo "print"` # to print something
    

```bash
val=1
val=$((val+1)) # it increases the value by 1
```

* We can use let val+=1 to increase its value
    

```bash
fix=2
for ((i = 1; i <= 99; i++)) 
do
    if [ $((i%fix)) -eq 1 ] 
    then
        echo "Number: $i"
    fi
done

output: 1, 3, 5, 7, 9, 11, ....., 99
```

* `read is used to take input`
    
* **Comparing numbers:**
    
    ```bash
    read X
    read Y
    
    if [ $X -lt $Y ] ; 
    then
        echo "X is less than Y"
    elif [ $X -gt $Y ] ;
    then
        echo "X is greater than Y"
    else
        echo "X is equal to Y"
        fi
    ```
    
* Comparing multiple conditions:
    

```bash
read c
if [[ c=="Y" || c=="y" ]]
then
    echo "YES"
else 
    echo "NO"
    fi
```