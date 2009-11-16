<?
include_once 'common.php';

$path=realpath($root);
$root=array(
	array(
		'name' => basename($path),
		'type' => 'folder',
		'abs_path' => $path
	)
);

echo json_safe_encode($root);

?>