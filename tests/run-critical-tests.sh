#!/bin/bash
# Run only the critical, reliable tests

echo "=========================================="
echo "  Critical Test Suite"
echo "=========================================="
echo

PASSED=0
FAILED=0

run_test() {
    local test_file=$1
    local test_name=$2
    
    echo "Test: $test_name"
    echo "----------------------------------------"
    
    if timeout 45 node "$test_file" > /tmp/test_output.txt 2>&1; then
        echo "✓ PASSED"
        ((PASSED++))
    else
        echo "✗ FAILED"
        tail -10 /tmp/test_output.txt
        ((FAILED++))
    fi
    echo
}

# Core tests
run_test "test-controls.js" "Control Verification (A/D rotation)"
run_test "test-ux-improvements.js" "UX Improvements"
run_test "test-v0.1.0-complete.js" "v0.1.0 Complete"

echo "=========================================="
echo "Results: $PASSED passed, $FAILED failed"
echo "=========================================="

if [ $FAILED -eq 0 ]; then
    echo "✓✓✓ ALL CRITICAL TESTS PASSED ✓✓✓"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
