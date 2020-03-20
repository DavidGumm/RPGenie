
Add-Type -AssemblyName System;
Add-Type -AssemblyName System.Data;
Add-Type -AssemblyName System.Data.Linq;
Add-Type -AssemblyName System.Collections;

#[xml]$db = Get-Content -Path db.xml

$FrontEnd = $db.root.tables.category[0]
$BackEnd = $db.root.tables.category[1]

$array = [System.Collections.Generic.List[object]]::new();

foreach($front in $BackEnd.ChildNodes)
{
    $results = $front.tablerows.ChildNodes
    foreach($result in $results)
    {
        $array.Add($result.results.FirstChild.result.'#text');
    }
    "$($Item.Title)"
    $Item = @{};
    $Item.Title = $front.name.'#text';
    $Item.Description = $front.description.'#text';
    $Item.Items = $array
    $Item | ConvertTo-Json | Set-Content "$($Item.Title).JSON";
}