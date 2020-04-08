CLS
Add-Type -AssemblyName System;
Add-Type -AssemblyName System.Data;
Add-Type -AssemblyName System.Data.Linq;
Add-Type -AssemblyName System.Collections;

#[xml]$db = Get-Content -Path "data\db.xml"

$FrontEnd = $db.root.tables.category[0]
$BackEnd = $db.root.tables.category[1]

$mainTables = $FrontEnd, $BackEnd;


$Items = [System.Collections.Generic.List[object]]::new();

$tables = @{};

foreach($category in $mainTables)
{
    foreach($child1 in $category.ChildNodes)
    {
        foreach($child2 in $child1.tablerows.ChildNodes)
        {
            foreach($child3 in $child2.results.ChildNodes)
            {
                $Items.Add($child3.result.'#text');
            }
        }
        
        $Title = $child1.name.'#text'
        $key = $Title -replace "\d\d - ", "" -replace "\s+","" -replace "[!,(,),-,-,+,\d,\.]+",""
        $Description = $child1.description.'#text'

        $tables[$key] = @{
            Title = $Title
            Description = $Description
            Items = $Items
        }
        $Items = [System.Collections.Generic.List[object]]::new();
    }
}


$tables | ConvertTo-Json | Set-Content C:\Users\gummd\source\repos\RPGenie\Data\db.JSON
$tables | ConvertTo-Json -Compress | Set-Content C:\Users\gummd\source\repos\RPGenie\Data\db.compressed.JSON