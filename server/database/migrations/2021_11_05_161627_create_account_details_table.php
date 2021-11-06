<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('account_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts');
            $table->string('encryptedSummonerId');
            $table->integer('profileIconId');
            $table->integer('summonerLevel');
            $table->string('solo_tier')->nullable(true);
            $table->string('solo_rank')->nullable(true);
            $table->string('solo_leaguePoints')->nullable(true);
            $table->string('solo_wins')->nullable(true);
            $table->string('solo_losses')->nullable(true);
            $table->string('flex_tier')->nullable(true);
            $table->string('flex_rank')->nullable(true);
            $table->string('flex_leaguePoints')->nullable(true);
            $table->string('flex_wins')->nullable(true);
            $table->string('flex_losses')->nullable(true);
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
        Schema::dropIfExists('account_details');
    }
}
