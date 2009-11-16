<?
$name=time();
$count=rand(2,10);
$json='[';
$children=array();
for($i=0;$i<$count;$i++){
	$children[]='
		{
			"name":"rnd'.rand(30,60).'"
		}
		';
}
$json.=join($children,',').']';
echo $json;