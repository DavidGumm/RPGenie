CLS;
Add-Type -AssemblyName System;
Add-Type -AssemblyName System.Data;
Add-Type -AssemblyName System.Data.Linq;
Add-Type -AssemblyName System.Collections;

#[xml]$db = Get-Content -Path db.xml

#$FrontEnd = $db.root.tables.category[0]
#$BackEnd = $db.root.tables.category[1]

$array = [System.Collections.Generic.List[object]]::new();

foreach($result in $FrontEnd.'id-00004'.tablerows.ChildNodes)
{
    $array.Add($result.results.FirstChild.result.'#text');
}

$Item = @{};
$Item.Title = $FrontEnd.'id-00004'.name.'#text';
$Item.Description = $FrontEnd.'id-00004'.description.'#text';
$Item.Items = $array
$Item | ConvertTo-Json | Set-Content "05 - Big City Random Shops.JSON";
