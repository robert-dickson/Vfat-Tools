$(function() {
	consoleInit();
    start(main);
  });
  async function main() {
    const App = await init_ethers();

    //ABIs
  	const SNOWGLOBE_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[{"type":"address","name":"reserve","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMin","inputs":[{"type":"uint256","name":"_min","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
  	const ICEQUEEN_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_snowball","internalType":"contract Snowball"},{"type":"address","name":"_devfund","internalType":"address"},{"type":"address","name":"_treasury","internalType":"address"},{"type":"uint256","name":"_snowballPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Recovered","inputs":[{"type":"address","name":"token","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusEndBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"devFundDivRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devfund","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingSnowball","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accSnowballPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBonusEndBlock","inputs":[{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevFundDivRate","inputs":[{"type":"uint256","name":"_devFundDivRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSnowballPerBlock","inputs":[{"type":"uint256","name":"_snowballPerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTreasuryDivRate","inputs":[{"type":"uint256","name":"_treasuryDivRate","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract Snowball"}],"name":"snowball","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"snowballPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"treasuryDivRate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateDevfund","inputs":[{"type":"address","name":"_devfund","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateTreasury","inputs":[{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
  	const PGL_ABI = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Burn","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Mint","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Swap","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount0Out","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1Out","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Sync","inputs":[{"type":"uint112","name":"reserve0","internalType":"uint112","indexed":false},{"type":"uint112","name":"reserve1","internalType":"uint112","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_SEPARATOR","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MINIMUM_LIQUIDITY","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"amount0","internalType":"uint256"},{"type":"uint256","name":"amount1","internalType":"uint256"}],"name":"burn","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint112","name":"_reserve0","internalType":"uint112"},{"type":"uint112","name":"_reserve1","internalType":"uint112"},{"type":"uint32","name":"_blockTimestampLast","internalType":"uint32"}],"name":"getReserves","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_token0","internalType":"address"},{"type":"address","name":"_token1","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"kLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price0CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price1CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"skim","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"swap","inputs":[{"type":"uint256","name":"amount0Out","internalType":"uint256"},{"type":"uint256","name":"amount1Out","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"sync","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token0","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false}]

  	//contracts
    const SNOWGLOBE_SUSHI_ADDR = "0x751089F1bf31B13Fa0F0537ae78108088a2253BF";
    const SNOWGLOBE_PNG_ADDR = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
    const SNOWGLOBE_ETH_ADDR = "0x586554828eE99811A8ef75029351179949762c26";
    const ICEQUEEN_ADDR = "0xB12531a2d758c7a8BF09f44FC88E646E1BF9D375";

    //pangolin pairs
    const SUSHI_AVAX_ADDR = "0xd8B262C0676E13100B33590F10564b46eeF652AD";
    const SNOB_AVAX_ADDR = "0xa1c2c3b6b120cbd4cec7d2371ffd4a931a134a32";
    const PNG_AVAX_ADDR = "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367";
    const ETH_AVAX_ADDR = "0x1aCf1583bEBdCA21C8025E172D8E8f2817343d65";

    //tokens
    const SPGL_SUSHI_ADDRESS = "0x751089f1bf31b13fa0f0537ae78108088a2253bf";
    const SPGL_PNG_ADDRESS = "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815";
    const SPGL_ETH_ADDRESS = "0x586554828eE99811A8ef75029351179949762c26";
    const SNOB_ADDRESS = "0xc38f41a296a4493ff429f1238e030924a1542e50";

    //URLs
    const SUSHI_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc";
    const SNOB_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xc38f41a296a4493ff429f1238e030924a1542e50";
    const PNG_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0x60781c2586d68229fde47564546784ab3faca982";
    const ETH_AVAX_POOL_URL = "https://app.pangolin.exchange/#/add/AVAX/0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15";


	const approveSUSHI = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_SUSHI_ADDR, SUSHI_AVAX_ADDR, App)
	}
	const stakeSUSHI = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SUSHI_AVAX_ADDR, App)
	}
	const withdrawSUSHI = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_SUSHI_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}
	const approvePNG = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_PNG_ADDR, PNG_AVAX_ADDR, App)
	}
	const stakePNG = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, PNG_AVAX_ADDR, App)
	}
	const withdrawPNG = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_PNG_ADDR, 1, SPGL_PNG_ADDRESS, App)
	}
	const approveETH = async function() {
		return snowglobeContract_approve(PGL_ABI, SNOWGLOBE_ETH_ADDR, ETH_AVAX_ADDR, App)
	}
	const stakeETH = async function() {
		return snowglobeContract_stake(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, ETH_AVAX_ADDR, App)
	}
	const withdrawETH = async function() {
		return snowglobeContract_withdraw(SNOWGLOBE_ABI, SNOWGLOBE_ETH_ADDR, 1, SPGL_ETH_ADDRESS, App)
	}
	const approveSPGLSUSHI = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_SUSHI_ADDRESS, App)
	}
	const stakeSPGLSUSHI = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}
	const approveSPGLPNG = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_PNG_ADDRESS, App)
	}
	const stakeSPGLPNG = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
	}
	const approveSPGLETH = async function() {
		return icequeenContract_approve(SNOWGLOBE_ABI, ICEQUEEN_ADDR, SPGL_ETH_ADDRESS, App)
	}
	const stakeSPGLETH = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
	}
	const approveSNOB = async function() {
		return icequeenContract_approve(PGL_ABI, ICEQUEEN_ADDR, SNOB_AVAX_ADDR, App)
	}
	const stakeSNOB = async function() {
		return icequeenContract_stake(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}
	const claimPool1 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SNOB_AVAX_ADDR, App)
	}
	const claimPool2 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}
	const claimPool3 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SNOB_AVAX_ADDR, App)
	}
	const claimPool4 = async function() {
	  	return icequeenContract_claim(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SNOB_AVAX_ADDR, App)
	}

	const withdrawPool1 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 1, SPGL_SUSHI_ADDRESS, App)
	}

	const withdrawPool2 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 2, SNOB_AVAX_ADDR, App)
	}

	const withdrawPool3 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 3, SPGL_PNG_ADDRESS, App)
	}
	const withdrawPool4 = async function() {
		return icequeenContract_withdraw(ICEQUEEN_ABI, ICEQUEEN_ADDR, 4, SPGL_ETH_ADDRESS, App)
	}


    const signer = App.provider.getSigner()

    //Tokens
    const SUSHI_AVAX_TOKEN = new ethers.Contract(SUSHI_AVAX_ADDR, ERC20_ABI, signer)
    const PNG_AVAX_TOKEN = new ethers.Contract(PNG_AVAX_ADDR, ERC20_ABI, signer)
    const ETH_AVAX_TOKEN = new ethers.Contract(ETH_AVAX_ADDR, ERC20_ABI, signer)
    const SNOB_AVAX_TOKEN = new ethers.Contract(SNOB_AVAX_ADDR, ERC20_ABI, signer)
    const SPGL_SUSHI_TOKEN = new ethers.Contract(SPGL_SUSHI_ADDRESS, ERC20_ABI, signer)
    const SPGL_PNG_TOKEN = new ethers.Contract(SPGL_PNG_ADDRESS, ERC20_ABI, signer)
    const SPGL_ETH_TOKEN = new ethers.Contract(SPGL_ETH_ADDRESS, ERC20_ABI, signer)
    const SNOB_TOKEN = new ethers.Contract(SNOB_ADDRESS, ERC20_ABI, signer)

    //Contracts
    const ICEQUEEN_CONTRACT = new ethers.Contract(ICEQUEEN_ADDR, ICEQUEEN_ABI, signer)

    //Balances

    const currentSUSHIAVAXTokens = await SUSHI_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLSUSHITokens = await SPGL_SUSHI_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglSushiDisplayAmt = currentSPGLSUSHITokens > 1000 ? currentSPGLSUSHITokens / 1e18: 0;

    const currentPNGAVAXTokens = await PNG_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLPNGTokens = await SPGL_PNG_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglPngDisplayAmt = currentSPGLPNGTokens > 1000 ? currentSPGLPNGTokens / 1e18 : 0;

    const currentETHAVAXTokens = await ETH_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSPGLETHTokens = await SPGL_ETH_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const spglEthDisplayAmt = currentSPGLETHTokens > 1000 ? currentSPGLETHTokens / 1e18 : 0;

    const currentSNOBTokens = await SNOB_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const currentSNOBAVAXTokens = await SNOB_AVAX_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const snobAvaxDisplayAmt = currentSNOBAVAXTokens > 1000 ? currentSNOBAVAXTokens / 1e18 : 0;

    const pendingSNOBTokensPool1 = await ICEQUEEN_CONTRACT.pendingSnowball(1, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool2 = await ICEQUEEN_CONTRACT.pendingSnowball(2, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool3 = await ICEQUEEN_CONTRACT.pendingSnowball(3, App.YOUR_ADDRESS)
    const pendingSNOBTokensPool4 = await ICEQUEEN_CONTRACT.pendingSnowball(4, App.YOUR_ADDRESS)

    const stakedPool1 = await ICEQUEEN_CONTRACT.userInfo(1, App.YOUR_ADDRESS)
    const stakedPool2 = await ICEQUEEN_CONTRACT.userInfo(2, App.YOUR_ADDRESS)
	const stakedPool3 = await ICEQUEEN_CONTRACT.userInfo(3, App.YOUR_ADDRESS)
	const stakedPool4 = await ICEQUEEN_CONTRACT.userInfo(4, App.YOUR_ADDRESS)

	// Total staked in each pool
	const totalStakedSPGLSUSHI = await SPGL_SUSHI_TOKEN.balanceOf(ICEQUEEN_ADDR)
    const totalStakedSPGLPNG = await SPGL_PNG_TOKEN.balanceOf(ICEQUEEN_ADDR)
    const totalStakedSPGLETH = await SPGL_ETH_TOKEN.balanceOf(ICEQUEEN_ADDR)
	const totalStakedSNOBAVAX = await SNOB_AVAX_TOKEN.balanceOf(ICEQUEEN_ADDR)

	const claimableSnowballs = pendingSNOBTokensPool1 / 1e18 + pendingSNOBTokensPool2 /  1e18 + pendingSNOBTokensPool3 / 1e18 + pendingSNOBTokensPool4 / 1e18

	// balance
	_print(`<b>Wallet ❄️</b>`)
	_print(`Address: ${App.YOUR_ADDRESS}`);
	_print(`Snowballs: ${currentSNOBTokens / 1e18}`)
	_print(`Pending Snowballs: ${claimableSnowballs}`)
	_print(`Total (wallet + pending): ${currentSNOBTokens / 1e18 + claimableSnowballs}\n\n`)

	//snowglobes
	_print(`<b>Snowglobes 🌐</b>`)
	_print(`Deposit LP tokens into Snowglobes for automatic compounding\n`)
	_print(`<a href='${ETH_AVAX_POOL_URL}' target='_blank'>AVAX-ETH Pangolin LP - New! 🌟</a>`)
	_print(`Available to deposit: ${currentETHAVAXTokens / 1e18}`)
	_print(`Available to withdraw: ${spglEthDisplayAmt}`)
	_print_link(`Approve`, approveETH)
	_print_link(`Deposit`, stakeETH)
	_print_link(`Withdraw\n`, withdrawETH)
	_print(`<a href='${PNG_AVAX_POOL_URL}' target='_blank'>AVAX-PNG Pangolin LP</a>`)
	_print(`Available to deposit: ${currentPNGAVAXTokens / 1e18}`)
	_print(`Available to withdraw: ${spglPngDisplayAmt}`)
	_print_link(`Approve`, approvePNG)
	_print_link(`Deposit`, stakePNG)
	_print_link(`Withdraw\n`, withdrawPNG)
	_print(`<a href='${SUSHI_AVAX_POOL_URL}' target='_blank'>AVAX-SUSHI Pangolin LP</a>`)
	_print(`Available to deposit: ${currentSUSHIAVAXTokens / 1e18}`)
	_print(`Available to withdraw: ${spglSushiDisplayAmt}`)
	_print_link(`Approve`, approveSUSHI)
	_print_link(`Deposit`, stakeSUSHI)
	_print_link(`Withdraw`, withdrawSUSHI)
	_print(`\n`)

	//icequeen
	_print(`<b>IceQueen 👸 - Governance </b>`)
	_print(`Deposit Snowglobe tokens (sPGL) into IceQueen to receive governance tokens (SNOB)\n`)
	_print(`<u>Pool 4 - ETH-AVAX Snowglobe (sPGL) - New! 🌟</u>`)
	_print(`Available to stake: ${spglEthDisplayAmt}`)
	_print(`Available to unstake: ${stakedPool4.amount / 1e18}`)
	_print(`Pending Snowballs: ${pendingSNOBTokensPool4 / 1e18}`)
    _print(`Total overall staked: ${totalStakedSPGLETH / 1e18}`)
    _print(`Your stake share: ${(stakedPool4.amount / 1e18)/(totalStakedSPGLETH / 1e18)*100}%`)
	_print_link(`Approve`, approveSPGLETH)
	_print_link(`Stake`, stakeSPGLETH)
	_print_link(`Unstake`, withdrawPool4)
	_print_link(`Claim\n`, claimPool4)
	_print(`<u>Pool 3 - PNG-AVAX Snowglobe (sPGL)</u>`)
	_print(`Available to stake: ${spglPngDisplayAmt}`)
	_print(`Available to unstake: ${stakedPool3.amount / 1e18}`)
	_print(`Pending Snowballs: ${pendingSNOBTokensPool3 / 1e18}`)
    _print(`Total overall staked: ${totalStakedSPGLPNG / 1e18}`)
    _print(`Your stake share: ${(stakedPool3.amount / 1e18)/(totalStakedSPGLPNG / 1e18)*100}%`)
	_print_link(`Approve`, approveSPGLPNG)
	_print_link(`Stake`, stakeSPGLPNG)
	_print_link(`Unstake`, withdrawPool3)
	_print_link(`Claim\n`, claimPool3)
	_print(`<a href='${SNOB_AVAX_POOL_URL}'>Pool 2 - SNOB-AVAX LP</a>`)
	_print(`Available to stake: ${snobAvaxDisplayAmt}`)
	_print(`Available to unstake: ${stakedPool2.amount / 1e18}`)
	_print(`Pending Snowballs: ${pendingSNOBTokensPool2 / 1e18}`)
    _print(`Total overall staked: ${totalStakedSNOBAVAX / 1e18}`)
    _print(`Your stake share: ${(stakedPool3.amount / 1e18)/(totalStakedSNOBAVAX / 1e18)*100}%`)
	_print_link(`Approve`, approveSNOB)
	_print_link(`Stake`, stakeSNOB)
	_print_link(`Unstake`, withdrawPool2)
	_print_link(`Claim\n`, claimPool2)
	_print(`<u>Pool 1 - SUSHI-AVAX Snowglobe (sPGL)</u>`)
	_print(`Available to stake: ${spglSushiDisplayAmt}`)
	_print(`Available to unstake: ${stakedPool1.amount / 1e18}`)
	_print(`Pending Snowballs: ${pendingSNOBTokensPool1 / 1e18}`)
    _print(`Total overall staked: ${totalStakedSPGLSUSHI / 1e18}`)
    _print(`Your stake share: ${(stakedPool1.amount / 1e18)/(totalStakedSPGLSUSHI / 1e18)*100}%`)
	_print_link(`Approve`, approveSPGLSUSHI)
	_print_link(`Stake`, stakeSPGLSUSHI)
	_print_link(`Unstake`, withdrawPool1)
	_print_link(`Claim\n`, claimPool1)
	_print(`\n`);
    hideLoading();
  }

const snowglobeContract_approve = async function(chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
	alert('Already approved')
  } else {
  	allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Approval failed')
      })
  }
}

const icequeenContract_approve = async function(chefAbi, chefAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  showLoading()
  if (allowedTokens / 1e18 == ethers.constants.MaxUint256 / 1e18) {
	alert('Already approved')
  } else {
  	allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Approval failed')
      })
  }

}

const snowglobeContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  if (allowedTokens / 1e18 == 0) {
    alert('Please approve spending first')
  } else if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.depositAll()
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const snowglobeContract_withdraw = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.withdrawAll()
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens Withdrawn. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}


const icequeenContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  console.log(currentTokens)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  console.log(allowedTokens)
  let allow = Promise.resolve()

  if (allowedTokens / 1e18 == 0) {
    alert('Please approve spending first')
  } else if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.deposit(poolIndex, currentTokens)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens deposited. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake')
  }
}

const icequeenContract_withdraw = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)
  const ICEQUEEN_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  const userPoolInfo = await ICEQUEEN_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)
  console.log(userPoolInfo)
  const currentTokens = userPoolInfo.amount
  let allow = Promise.resolve()

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          ICEQUEEN_CONTRACT.withdraw(poolIndex, currentTokens)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Tokens withdraw. Refresh page to see balance.')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  } else {
    alert('You have no tokens to withdraw')
  }
}

const icequeenContract_claim = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()
  console.log(signer)

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  console.log(STAKING_TOKEN)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  console.log(CHEF_CONTRACT)

  const pendingRewards = await CHEF_CONTRACT.pendingSnowball(poolIndex, App.YOUR_ADDRESS)

  let allow = Promise.resolve()

  if (pendingRewards / 1e18 == 0) {
    alert('No rewards to claim')
  } else {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.withdraw(poolIndex, 1)
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
          	  alert('Rewards claimed. Refresh page for new balance')
            })
          })
          .catch(function() {
            hideLoading()
            alert('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        alert('Something went wrong.')
      })
  }
}
