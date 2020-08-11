describe('uiBinding', function() {
	// let dataAccess;

	beforeEach(function() {
		// create a new instance if needed.
	});

	it('should be defined and have the correct properties', function() {
		expect(uiBinding).toBeDefined();

		// Submodules
		expect(uiBinding.logging).toBeDefined();
		expect(uiBinding.wave).toBeDefined();

		// Functions in submodules
		expect(uiBinding.logging.setup).toBeDefined();
		expect(uiBinding.logging.enableAmountOptions).toBeDefined();

		expect(uiBinding.wave.setup).toBeDefined();
		expect(uiBinding.wave.updateWaveHeight).toBeDefined();
	});
});
