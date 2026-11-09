import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COLLECTOR_BOXES,
  calculateVaultSummary,
  formatCurrencyBRL,
  validateReservationForm,
  getAcousticComparisonProfile,
} from './catalog';

test('calculateVaultSummary computes single box total without trilogy discount', () => {
  const summary = calculateVaultSummary(['box-vozes-cristal']);
  assert.equal(summary.itemCount, 1);
  assert.equal(summary.totalDiscsCount, 5);
  assert.equal(summary.subtotalBRL, 1890);
  assert.equal(summary.discountBRL, 0);
  assert.equal(summary.finalTotalBRL, 1890);
  assert.equal(summary.isCompleteTrilogy, false);
});

test('calculateVaultSummary applies 12% collector privilege when all 3 boxes are selected', () => {
  const allIds = COLLECTOR_BOXES.map((b) => b.id);
  const summary = calculateVaultSummary(allIds);
  assert.equal(summary.itemCount, 3);
  assert.equal(summary.totalDiscsCount, 15);
  assert.equal(summary.subtotalBRL, 1890 + 2190 + 2050); // 6130
  assert.equal(summary.isCompleteTrilogy, true);
  assert.equal(summary.discountBRL, Math.round(6130 * 0.12)); // 736
  assert.equal(summary.finalTotalBRL, 6130 - 736); // 5394
});

test('formatCurrencyBRL formats Brazilian currency accurately', () => {
  assert.equal(formatCurrencyBRL(1890), 'R$ 1.890,00');
  assert.equal(formatCurrencyBRL(5394.5), 'R$ 5.394,50');
});

test('validateReservationForm rejects incomplete fields and accepts valid collector data', () => {
  const invalidResult = validateReservationForm({
    fullName: 'Joao',
    email: 'invalido',
    documentCpf: '123',
    postalCode: '123',
    addressLine: 'Rua',
    cityState: '',
    selectedBoxIds: [],
  });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.documentCpf);
  assert.ok(invalidResult.errors.selectedBoxIds);

  const validResult = validateReservationForm({
    fullName: 'Renato Alencar Silva',
    email: 'renato@colecionador.com.br',
    documentCpf: '123.456.789-01',
    postalCode: '17201-000',
    addressLine: 'Alameda dos Jacarandás, 450, Apto 81',
    cityState: 'Jaú / SP',
    selectedBoxIds: ['box-vozes-cristal'],
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('getAcousticComparisonProfile reflects 80% MP3 compression vs 100% vinyl fidelity', () => {
  const vinyl = getAcousticComparisonProfile('vinyl');
  const mp3 = getAcousticComparisonProfile('mp3');
  assert.equal(vinyl.preservedViolaFrequenciesPct, 100);
  assert.equal(mp3.preservedViolaFrequenciesPct, 20);
  assert.ok(vinyl.dynamicRangeDb > mp3.dynamicRangeDb);
});
