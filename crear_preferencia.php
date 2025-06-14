<?php
require 'vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Resources\Preference;

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? "test@demo.com";
$tipo = $_GET["tipo"] ?? "estandar";

$precios = [
    "estandar" => 2500,
    "avanzada" => 3150,
    "premium" => 4300
];
$monto = $precios[$tipo] ?? 2500;

MercadoPagoConfig::setAccessToken("YOUR_ACCESS_TOKEN");

$preference = new Preference();
$preference->items = [
    [
        "title" => "Plan " . ucfirst($tipo),
        "quantity" => 1,
        "unit_price" => $monto
    ]
];
$preference->payer = [ "email" => $email ];
$preference->back_urls = [
    "success" => "http://localhost/siajpag/success.html",
    "failure" => "http://localhost/siajpag/failure.html",
];
$preference->auto_return = "approved";
$preference->save();

echo json_encode(["id" => $preference->id]);
