#!/bin/bash
# Run all critical tests and report results

echo "=========================================="
echo "  Running Janktris Test Suite"
echo "=========================================="
echo

PASSED=0
FAILED=0
TESTS=()

run_test() {
    local test_file=$1
    local test_name=$2
    
    echo "Running: $test_name"
    echo "----------------------------------------"
    
    if timeout 30 node "$test_file" 2>&1; then
        echo "✓ PASSED"
        ((PASSED++))
        TESTS+=("✓ $test_name")
    else
        echo "✗ FAILED"
        ((FAILED++))
        TESTS+=("✗ $test_name")
    fi
    echo
}

# Core functionality tests
run_test "test-cases/test-20-blocks.js" "20-Block Drop Test"
run_test "test-cases/test-controls.js" "Control Verification"
run_test "test-cases/test-ux-improvements.js" "UX Improvements"
run_test "test-cases/test-v0.1.0-complete.js" "v0.1.0 Complete Verification"

# Summary
echo "=========================================="
echo "  Test Summary"
echo "=========================================="
echo
for test in "${TESTS[@]}"; do
    echo "$test"
done
echo
echo "Total: $((PASSED + FAILED)) tests"
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo
if [ $FAILED -eq 0 ]; then
    echo "✓✓✓ ALL TESTS PASSED ✓✓✓"
    exit 0
else
    echo "✗✗✗ SOME TESTS FAILED ✗✗✗"
    exit 1
fi
