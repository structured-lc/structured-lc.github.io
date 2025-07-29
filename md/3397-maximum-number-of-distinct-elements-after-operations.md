### Leetcode 3397 (Medium): Maximum Number of Distinct Elements After Operations [Practice](https://leetcode.com/problems/maximum-number-of-distinct-elements-after-operations)

### Description  
Given an array of integers `nums` and an integer `k`, you can add any integer between -k and k (inclusive) to each element **at most once**. Your goal is to maximize the number of **distinct** elements in the resulting array.  
For each number, you can pick any value in the range to push it away from duplicates, creating new distinct values using these operations.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3,3,4]`, `k = 2`  
Output: `6`  
*Explanation: By adding -2, -2, -1, -1 to nums[0:4], array becomes: [-1, 0, 1, 2, 3, 4]. All numbers are distinct.*

**Example 2:**  
Input: `nums = [4,4,4,4]`, `k = 1`  
Output: `3`  
*Explanation: Add -1, +1 to two elements: array is [3, 4, 5, 4]. Values are 3, 4, 5 (three distinct).*

**Example 3:**  
Input: `nums = [5,5,5,5,6]`, `k = 3`  
Output: `5`  
*Explanation: Add -3, -2, -1, 0 to each '5' gives [2,3,4,5,6], so all 5 numbers are unique.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible ways of modifying each element in [-k, k], check all resulting arrays, and count distinct elements. This approach is totally infeasible (exponential, since each number independently has 2k+1 choices).

- **Observation:**  
  Duplicates in the array are the bottleneck to maximizing distinct numbers. The operation lets you shift an element up to k units in either direction, at most once per element.

- **Better idea:**  
  For each number that appears multiple times (frequency), greedily shift duplicates to possible available empty slots (values not already present in the array), within their reachable [-k, k] window, so that as many elements as possible become unique. The best is to spread them as widely as possible.

- **Optimal approach:**  
  - Count the original elements' frequencies.
  - Use a set to keep track of used/occupied destinations.
  - For each original value and every occurrence (beyond the first), try to assign it to its closest unused spot in [num-k, num+k] (skip occupied).
  - Continue until no new available spot remains or you've handled all elements.

- **Trade-offs:**  
  The greedy approach works since the task is to maximize "distinct" count, so placing every possible value exactly once, as far away as possible, ensures you use up the available slots in [-k, k] intervals.  
  We can achieve O(n log n) or O(n + range) using a set/map for occupied elements.

### Corner cases to consider  
- Empty array (`nums = []`)
- All elements the same (`nums = [7,7,7,7]`)
- k = 0 (no operation allowed)
- Already all unique elements
- k is so large you can create "enough" spread  
- nums contains large numbers (need to avoid big memory allocations)

### Solution

```python
def maxDistinctNumAfterOperations(nums, k):
    # Count initial frequencies of elements
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1

    # Store all the unique elements before performing operations
    used = set(freq.keys())

    # For all elements present more than once, move duplicates to unused locations nearby
    pending = []
    for num, count in freq.items():
        for _ in range(count - 1):
            pending.append(num)

    # Try to move each duplicate as far left or right as possible into free positions
    # Since the only restriction is in the interval [num - k, num + k]
    # We'll try the closest slots to num
    for dup in pending:
        for d in range(1, k + 1):
            # Left check
            target = dup - d
            if target not in used:
                used.add(target)
                break
            # Right check
            target = dup + d
            if target not in used:
                used.add(target)
                break
        # If no slot found, the duplicate remains as is (value already in used)

    return len(used)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* k) in the worst case, because for each duplicate, we check at most k distinct options to either side for a free location. In practice, almost always much less, as we find free slots before sweeping the entire k-range.
- **Space Complexity:** O(n), since the main storage is for the frequency map and the set of used elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each element could be shifted multiple times (not just once)?
  *Hint: Can you formalize this as a dynamic programming or maximum matching problem?*

- Can this be done in less than O(n \* k) if k is large?
  *Hint: Use intervals and greedy sweeping instead of step-by-step checking.*

- Suppose nums contains negative values or is not bounded within the same interval—does the solution change?
  *Hint: Consider how your data structures and range checks should be adapted.*

### Summary
This problem demonstrates a classic greedy + frequency counting approach: analyze duplicate bottlenecks, and greedily spread values into available "slots" using allowed operations. This technique—convert "make unique" under constraints to frequency + allocation problem—shows up in problems about minimizing/removing duplicates, choosing disjoint intervals, and making arrays "good" by limited changes.