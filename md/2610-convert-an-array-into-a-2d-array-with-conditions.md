### Leetcode 2610 (Medium): Convert an Array Into a 2D Array With Conditions [Practice](https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions)

### Description  
You are given an array of integers, nums. Your task is to partition nums into a 2D array (list of lists) so that:
- Every element from nums is used exactly once.
- Each row contains only **distinct** integers.
- The number of rows is minimized.

You may return any valid answer that meets the above conditions; the 2D array can have different row lengths. This is a grouping/partitioning problem with the aim of minimizing the number of groups, under the uniqueness constraint for each group.


### Examples  

**Example 1:**  
Input: `nums = [1,3,4,1,2,3,1]`  
Output: `[[1,3,4,2],[1,3],[1]]`  
*Explanation:  
- The number '1' appears 3 times, so we need at least 3 rows so that no row contains more than one '1'.  
- Place one '1' per row, then add other unique values in each row until all nums are used.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `[[1,2,3,4]]`  
*Explanation:  
- All elements in nums are unique, so all can go into a single row.*

**Example 3:**  
Input: `nums = [6,6,6,5,5,7]`  
Output: `[[6,5,7],[6,5],]`  
*Explanation:  
- '6' appears 3 times -> at least 3 rows.
- '5' appears 2 times -> at least 2 rows for '5'.
- Place one of each number per row as much as possible, repeat the process until all are used. Final partition is as shown.*


### Thought Process (as if you’re the interviewee)  
First, I notice the core restriction: in each row, all numbers must be unique. To minimize the number of rows, we should maximize how many unique numbers are grouped together per row.

The critical insight:  
- If a number x appears k times in nums, then there must be at least k rows (otherwise, some row would have two x’s, violating the unique constraint).
- Therefore, the **minimum number of rows required equals the maximum frequency of any number in nums**.

**Naive/Brute-force idea:**  
Try all possible row assignments. This is exponential and not feasible.

**Optimized approach:**  
- Count the frequency for every number.
- Let maxFreq be the highest frequency found.
- Make maxFreq empty rows (lists).
- For each number num, place its k copies into different rows (first to kᵗʰ row).
- This ensures every row has unique numbers and uses the minimal number of rows required.
- The exact order of numbers in each row doesn't matter.

**Trade-offs:**  
- This approach is straightforward and guarantees minimal rows.
- Space usage is O(n) for the result and counting structure.

This pattern is similar to *greedy grouping* based on maximum overlap/appearance constraints.


### Corner cases to consider  
- Empty array (nums = []): should return [].
- All unique elements: single row.
- All elements same: one number repeated n times → n rows.
- Mixture where multiple numbers have max frequency.
- Large input (1 ≤ n ≤ 200), test space and efficiency.
- Elements in nums with 1 or higher frequency but less than the max.


### Solution

```python
def findMatrix(nums):
    # Count how many times each number appears
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1

    # The minimal number of rows needed
    max_freq = max(freq.values())

    # Create empty rows; will populate in round-robin style
    rows = [[] for _ in range(max_freq)]

    # For each unique number, distribute its copies to different rows
    for num in freq:
        for i in range(freq[num]):
            rows[i].append(num)

    return rows
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass for counting (O(n)), another pass to populate max_freq rows (worst-case O(n) for distributing all elements).
- **Space Complexity:** O(n) — Extra space for the frequency dictionary (≤ n), and the output 2D array holds n elements (same as input), so O(n) total.


### Potential follow-up questions (as if you’re the interviewer)  

- What if rows must be of equal length?  
  *Hint: Is this always possible? When must we pad with values (e.g. None)?*

- How would you adapt the approach if you want to maximize instead of minimize the number of rows?  
  *Hint: What’s the smallest possible row, and under which condition?*

- Could you reconstruct the original array from a valid answer?  
  *Hint: Would row sorting or element order matter for reversibility?*


### Summary
This problem is a classic example of *grouping with minimal repeats*, using the observation that the minimal number of groups (rows) is set by the most frequent number. The approach applies *hash counting* and *round-robin distribution* for greedy partitioning. The same logic can be used in other problems involving “no repeats within a group” constraints, such as scheduling, seat assignment, or distributing tasks with frequency limits.


### Flashcard
The minimum number of rows equals the maximum frequency of any number in the array.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
