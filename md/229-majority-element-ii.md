### Leetcode 229 (Medium): Majority Element II [Practice](https://leetcode.com/problems/majority-element-ii)

### Description  
Given an integer array nums of length n, find all elements in the array that appear **strictly more than ⌊n/3⌋ times**. Because only up to two such elements can exist, return them in any order.

### Examples  

**Example 1:**  
Input: `[3,2,3]`  
Output: `[3]`  
*Explanation: 3 appears 2 times; ⌊3/3⌋ = 1, so 2 > 1. Only 3 qualifies.*

**Example 2:**  
Input: `[1,1,1,3,3,2,2,2]`  
Output: `[1,2]`  
*Explanation: 1 appears 3 times, 2 appears 3 times; ⌊8/3⌋ = 2, so both > 2.*

**Example 3:**  
Input: `[1,2,3]`  
Output: `[]`  
*Explanation: Each element appears just once; ⌊3/3⌋ = 1, and none appear more than 1 time.*

### Thought Process (as if you’re the interviewee)  
First, I’d clarify that we’re to find elements occurring more than ⌊n/3⌋ times, and only up to two such elements can exist by pigeonhole principle.

#### Brute-force:  
For each element, count its occurrences (nested loops) and collect those > ⌊n/3⌋. Time: O(n²), not efficient.

#### Hash Map Count:  
Count all numbers with a hash map in one pass. Collect keys appearing > ⌊n/3⌋ times. Time: O(n), Space: O(n).

#### Optimized — Boyer-Moore Voting Algorithm (Extended):  
Since there can be at most two such elements, keep two candidate variables and their counts:
- 1st pass: Identify up to two candidates using a voting algorithm.
- 2nd pass: Count actual occurrences to verify.
This uses O(1) extra space and O(n) time, which is optimal for this problem.

Trade-off: The Boyer-Moore extension is more elegant and uses less space but is a bit trickier to implement and understand compared to map/array counting.

### Corner cases to consider  
- Empty array: should return `[]`
- Single-element: if input is `[x]` should return `[x]`
- All elements equal: e.g. `[4,4,4,4]` should return `[4]`
- No majority elements: e.g. `[1,2,3,4]`
- Exactly two elements above threshold, or none at all

### Solution

```python
from typing import List

def majorityElement(nums: List[int]) -> List[int]:
    # Extended Boyer-Moore Voting Algorithm
    n = len(nums)
    if not nums:
        return []
    
    # Step 1: Find possible candidates
    candidate1 = candidate2 = None
    count1 = count2 = 0
    
    for num in nums:
        if candidate1 == num:
            count1 += 1
        elif candidate2 == num:
            count2 += 1
        elif count1 == 0:
            candidate1, count1 = num, 1
        elif count2 == 0:
            candidate2, count2 = num, 1
        else:
            count1 -= 1
            count2 -= 1
    
    # Step 2: Verify the candidates
    result = []
    for cand in [candidate1, candidate2]:
        if cand is not None and nums.count(cand) > n // 3:
            if cand not in result:
                result.append(cand)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - First pass for candidates O(n)
  - Second pass to confirm counts O(n)
- **Space Complexity:** O(1) extra, except output list (can hold at most 2 elements)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirement changed to ⌊n/k⌋? How would your solution scale?
  *Hint: Extend to k-1 candidates and counters.*

- Can this process be done in a single pass?
  *Hint: Hard for strict verification, second pass is generally needed to confirm.*

- How would you handle large arrays or streaming data with memory constraints?
  *Hint: Use the same Boyer-Moore voting extension, but can't count exactly at the end for streaming.*

### Summary
We used the extended **Boyer-Moore Voting Algorithm** to solve for elements appearing more than ⌊n/3⌋ times with O(n) time and O(1) space. The same pattern can be generalized to finding elements that appear more than ⌊n/k⌋ times by keeping k−1 candidates and their counts. This is a classic frequent elements pattern, widely applicable in voting, streaming, and summary statistics problems.


### Flashcard
Use Boyer-Moore Voting to find up to two candidates appearing >⌊n/3⌋ times, then verify counts in a second pass.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Majority Element(majority-element) (Easy)
- Check If a Number Is Majority Element in a Sorted Array(check-if-a-number-is-majority-element-in-a-sorted-array) (Easy)
- Most Frequent Even Element(most-frequent-even-element) (Easy)