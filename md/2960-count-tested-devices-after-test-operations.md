### Leetcode 2960 (Easy): Count Tested Devices After Test Operations [Practice](https://leetcode.com/problems/count-tested-devices-after-test-operations)

### Description  
You are given a list of devices, each with a non-negative integer battery percentage. Starting from the first device, if a device's battery percentage is greater than 0, you "test" it (count it), and after each such test, every subsequent device's battery percentage drops by 1. You can only test a device if, at the moment you consider testing it, its battery percentage is still greater than 0. Determine how many devices are tested.

### Examples  

**Example 1:**  
Input: `batteryPercentages = [1, 1, 2, 1, 3]`  
Output: `3`  
*Explanation:  
- Start with 0 tested: [1, 1, 2, 1, 3]  
- 1st device: 1 - 0 = 1 > 0 → test (tested = 1)  
- 2nd device: 1 - 1 = 0 ≤ 0 → skip  
- 3rd device: 2 - 1 = 1 > 0 → test (tested = 2)  
- 4th device: 1 - 2 = -1 ≤ 0 → skip  
- 5th device: 3 - 2 = 1 > 0 → test (tested = 3)  
Total tested: 3  
*

**Example 2:**  
Input: `batteryPercentages = [0, 1, 2]`  
Output: `2`  
*Explanation:  
- 1st device: 0 - 0 = 0 → skip  
- 2nd device: 1 - 0 = 1 > 0 → test (tested = 1)  
- 3rd device: 2 - 1 = 1 > 0 → test (tested = 2)  
Total tested: 2  
*

**Example 3:**  
Input: `batteryPercentages = [1, 1, 1, 1]`  
Output: `1`  
*Explanation:  
- 1st device: 1 - 0 = 1 > 0 → test (tested = 1)  
- 2nd: 1 - 1 = 0 → skip  
- 3rd: 1 - 1 = 0 → skip  
- 4th: 1 - 1 = 0 → skip  
Total tested: 1  
*

### Thought Process (as if you’re the interviewee)  
- Brute-force: After every test, decrement all following devices' battery percentages by 1. This would have O(n²) time complexity.
- Notice that each test only affects the count: For each device, the number of prior tested devices is all that matters, because each test only decrements the subsequent devices.
- So, for each device at index `i`, if `batteryPercentages[i] - testedDevCount > 0`, test (increment testedDevCount).
- This allows O(n) single pass, since we only need to know how many have been tested so far, not the actual decremented values at each step.

### Corner cases to consider  
- Empty list ⇒ Output = 0  
- All zeros ⇒ Output = 0  
- All large numbers ⇒ All are tested  
- Single device: zero/nonzero  
- Devices already at zero after previous tests  
- Very large input size (check O(n) approach)

### Solution

```python
def countTestedDevices(batteryPercentages):
    tested_count = 0
    for battery in batteryPercentages:
        # Subtract the number of previously tested devices.
        if battery - tested_count > 0:
            tested_count += 1
    return tested_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we scan through the list once, processing each element in constant time.
- **Space Complexity:** O(1), since we only use a few variables for counting; no extra data proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of reducing by 1, each test reduced subsequent batteries by k?
  *Hint: Can you generalize tested_count to accumulate by k per successful test?*

- What if you could test devices in any order for maximum tested devices?
  *Hint: Think about greedy approaches, and how reordering might help.*

- How would you adjust the solution to return the indices of tested devices instead of just the count?
  *Hint: Track indices where you perform successful tests.*

### Summary
We solved this problem with a classic **array simulation** — tracking cumulative effect (number of tests so far) and checking if the iᵗʰ device, given this, is still testable. The technique is a rolling "prefix effect" counter, often useful in problems where sequential changes accumulate and affect a series of elements. This pattern appears in greedy single-pass problems where history influences future eligibility.

### Tags
Array(#array), Simulation(#simulation), Counting(#counting)

### Similar Problems
