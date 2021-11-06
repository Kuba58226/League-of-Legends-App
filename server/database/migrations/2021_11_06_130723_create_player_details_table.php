<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayerDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('player_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_details_id')->constrained('match_details');
            $table->integer('participantId');
            $table->string('summonerName');
            $table->integer('teamId');
            $table->boolean('win');
            $table->integer('kills');
            $table->integer('deaths');
            $table->integer('assists');
            $table->integer('totalDamageDealtToChampions');
            $table->integer('totalMinionsKilled');
            $table->integer('champLevel');
            $table->integer('championId');
            $table->integer('summoner1Id');
            $table->integer('summoner2Id');
            $table->integer('item0');
            $table->integer('item1');
            $table->integer('item2');
            $table->integer('item3');
            $table->integer('item4');
            $table->integer('item5');
            $table->integer('item6');
            $table->string('lane');
            $table->string('role');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('player_details');
    }
}
