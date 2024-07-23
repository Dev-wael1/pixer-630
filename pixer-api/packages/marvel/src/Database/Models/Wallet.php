<?php

namespace Marvel\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wallet extends Model
{
    protected $table = 'wallets';

    public $guarded = [];

    protected $appends = ['available_points_to_currency'];

    /**
     * @return BelongsToMany
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function getAvailablePointsToCurrencyAttribute()
    {
        $settings = Settings::getData();
        $currencyToWalletRatio = $settings->options['currencyToWalletRatio'] ?? 0;
        try {
            return $this->available_points / $currencyToWalletRatio;
        } catch (\Throwable $th) {
            return 0;
        }
    }
}
