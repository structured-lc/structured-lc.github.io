### Leetcode 2449 (Hard): Minimum Number of Operations to Make Arrays Similar [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar)

### Description  
Given two arrays, **nums** and **target**, both of length n, your goal is to make **nums** similar to **target** using the minimum number of operations.  
In each operation, you can pick any two **different** indices, add 2 to one element and subtract 2 from the other (nums[i] += 2, nums[j] -= 2).  
Arrays are "similar" if both have the same frequency of each value (after sorting, nums equals target).  
You are guaranteed that such a transformation is always possible.  
Key constraint: Adding or subtracting 2 will never turn an odd number into an even one or vice versa, so *odd numbers must map to odd numbers, and evens to evens*.

### Examples  

**Example 1:**  
Input: `nums = [8,12,6], target = [2,14,10]`  
Output: `2`  
Explanation:  
Sorted even numbers: nums=[6,8,12], target=[2,10,14].  
Operation 1: 6→8 (add 2), 12→10 (subtract 2) → nums=[8,8,10].  
Operation 2: 8→6 (subtract 2), 8→10 (add 2) → nums=[6,10,10].  
With 2 operations, nums can be made similar to target.

**Example 2:**  
Input: `nums = [1,2,5], target = [4,1,3]`  
Output: `1`  
Explanation:  
Odds: nums=[1,5], target=[1,3], Evens: nums=[2], target=[4].  
To get from 5→3, need one operation: pick 5 and 1, do (5-2=3, 1+2=3), but since 1 already matches, just shift "excess" between 5 and 3. Requires 1 operation.

**Example 3:**  
Input: `nums = [1,1,1,1], target = [1,1,1,1]`  
Output: `0`  
Explanation:  
Arrays already similar. No operation needed.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  A naive approach would try all operation sequences, but this is exponential and totally infeasible for n up to 10⁵.

- **Observations:**  
  - Each operation changes two numbers by ±2, preserving the sum and parity.
  - You **cannot** convert an odd to an even or vice versa.
  - Only rearrangements and pairwise value movements within odds and within evens are possible.

- **Optimized Approach:**  
  - **Sort nums and target** separately, but sort and align odds with odds, evens with evens.
  - For each parity group, align nums[i] with target[i].  
  - For each i, the number of changes needed is |nums[i] - target[i]|.  
  - Each operation shifts “2 units” at a time between two indices, so total number of *2-unit shifts* is sum(|nums[i] - target[i]| // 2).
  - Each single operation can compensate for two "unit shifts" at once (adding to one and subtracting from another). So, divide the total shift sum by 2 for the minimum operations.

- **Why this works:**  
  - You only need to "route" all excess down by pairing large-over-small and small-over-large within parity, which is optimal via sorted arrays.

### Corner cases to consider  
- Arrays already equal (no operations).
- Single element arrays.
- All elements have just one parity.
- Large negative and positive numbers.
- nums and target have different arrangements but the same frequencies.
- Maximum possible input sizes.

### Solution

```python
def makeSimilar(nums, target):
    # Separate nums and target into odds and evens
    nums_odd = sorted([x for x in nums if x % 2])
    nums_even = sorted([x for x in nums if x % 2 == 0])
    target_odd = sorted([x for x in target if x % 2])
    target_even = sorted([x for x in target if x % 2 == 0])
    
    # Compute total "unit shifts" needed (difference divided by 2 for each pair)
    total_ops = 0
    for a, b in zip(nums_odd, target_odd):
        total_ops += abs(a - b) // 2
    for a, b in zip(nums_even, target_even):
        total_ops += abs(a - b) // 2

    # Each operation can fix 2 unit shifts, so divide by 2
    return total_ops // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Dominated by sorting nums and target (splitting into odds/evens and sorting each; each up to n in length), then O(n) for the diffs.
- **Space Complexity:** O(n)  
  Need extra space for the odds and evens partitions.

### Potential follow-up questions (as if you’re the interviewer)  

- *What if you can only increase numbers (not decrease)?*  
  Hint: Focus on whether every target is always reachable.

- *What if you want the sequence of operations, not just the count?*  
  Hint: Think of a greedy assignment by following the sort, or using a queue to trace shifts.

- *What if you can add/subtract 1 instead of 2?*  
  Hint: Parity constraints may no longer help.

### Summary
This problem uses the **Greedy + Sorting** pattern and parity partitioning to ensure only possible moves are considered.  
By separating odds and evens, and matching their sorted orders, we minimize the total "unit shift distance" efficiently.  
This pattern is common in problems involving operations that preserve certain mathematical properties (like parity), and reappears in array transformation, difference minimization, and balance problems.