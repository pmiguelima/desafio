<?php

namespace Tests\Feature;

use Tests\TestCase;



class HelloWorldTest extends TestCase
{

    public function testHelloSemToken()
    {
        $response = $this->getJson('/api/hello');

        $response->assertStatus(401);
    }

    // public function testHelloComTokenInvalido()
    // {
    //     $response = $this->withHeaders([
    //         'Authorization' => 'Bearer token_fake'
    //     ])->getJson('/api/hello');

    //     $response->assertStatus(401);
    // }
}
