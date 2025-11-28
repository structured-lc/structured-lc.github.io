### Leetcode 2598 (Medium): Smallest Missing Non-negative Integer After Operations [Practice](https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations)

### Description  
Given an integer array `nums` and an integer `value`, you can perform unlimited operations where for any index, you can add or subtract `value` from `nums[i]` (any number of times, on any element).  
The task is to find the **smallest non-negative integer** (MEX: minimum excluded) that cannot be obtained as an element of the array after performing any number of operations.

In other words, after all possible value-add/subtract operations on each item, what is the smallest non-negative integer you can NOT make with the transformed array.

### Examples  

**Example 1:**  
Input: `nums = [1, -10, 7, 13, 6, 8], value = 5`  
Output: `4`  
*Explanation:  
After operations, all numbers in nums can become any number ≡ (num mod 5), so possible remainders: [1, 0, 2, 3, 1, 3]. We can make:  
0 (one 0), 1 (two 1s), 2 (one 2), 3 (two 3s).  
Fill 0, 1, 2, 3 using the available slots, but cannot fill 4 (no 4 mod 5 in the list). So, answer is 4.*

**Example 2:**  
Input: `nums = [1,2,3,4,5], value = 1`  
Output: `5`  
*Explanation:  
When value=1, you can reach any integer from any integer. So, all positions 0,1,2,3,4 are covered, first missing is 5.*

**Example 3:**  
Input: `nums = [0,2,3], value = 2`  
Output: `1`  
*Explanation:  
nums mod 2: [0, 0, 1]. So two ways to make numbers congruent to 0 mod 2, and one way to make 1 mod 2.  
So, we can form 0 (use one 0), 1 (use one 1), 2 (use another 0), but now we can't make 3 (need another 1), so answer is 3. But only one 1, so answer is 1.*

### Thought Process (as if you’re the interviewee)  
- Brute force: Try every possible operation for each element. For each number, keep adding or subtracting 'value' and check what numbers can be formed. Extremely inefficient (infinite possible numbers), so this doesn't scale.

- Key insight: After any number of additions/subtractions of `value`, any `num` becomes any integer congruent to its original (num mod value). IE:  
  From num, we can reach: num, num+value, num-value, ..., i.e., any k such that k ≡ num mod value.

- So, for each possible remainder r = 0 .. value-1, count how many elements in nums have that remainder.

- The process of forming non-negative numbers is equivalent to greedily assigning those 'slots' to all possible integers starting from 0.  
  For each k ≥ 0, if there is at least one slot with k mod value == r, and r has not been exhausted, you can make k.

- Implementation:  
  - Build count of how many nums have each possible (num mod value).  
  - For i from 0 up, at each step, use the count of i % value. If zero, then i is missing.  
  - Otherwise, decrement that remainder's count and move forward.

- This is efficient: O(n) time and O(value) space.

### Corner cases to consider  
- Empty input array (should return 0)
- Only negative numbers
- Only zeros
- value == 1 (everything is possible)
- value larger than max num in nums
- Duplicate elements in nums
- Counts of remainders less than how many are needed to build up to the missing integer

### Solution

```python
def findSmallestInteger(nums, value):
    # Count how many numbers fall into each remainder class mod 'value'
    count = [0] * value
    for num in nums:
        rem = (num % value + value) % value  # ensure positive remainder
        count[rem] += 1

    i = 0
    while True:
        rem = i % value
        if count[rem] == 0:
            # No more numbers in this remainder class
            return i
        count[rem] -= 1
        i += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m),  
  where n is the input size and m is the answer (but m cannot exceed n, so overall O(n)).
- **Space Complexity:** O(value),  
  as only the `count` array of size value is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are given a stream of queries where values are added or removed?
  *Hint: Can you update the counts incrementally, and how would you efficiently find the answer with dynamic updates?*
- Can you solve this for extremely large `value`?
  *Hint: Does anything in the approach depend directly on value, and how could you avoid linear arrays?*
- What if the allowed operation was only addition, not subtraction?
  *Hint: What does that change about the reachable numbers? Would you still cover all remainders?*

### Summary
To solve this problem efficiently, notice the transformations allow every number to become any value congruent to its remainder mod `value`.  
By counting the occurrences for each remainder, and greedily matching up integers starting from 0 with available slots, we directly find the smallest non-negative integer that cannot be formed.  
This greedy remainders + count assignment is a common competitive-programming technique (variants appear in “minimum excluded value” or “Mex” settings), and similar principles can be applied to interval covering and modular reachability problems.


### Flashcard
Key insight: from num, reachable values are num mod value; find smallest non-negative integer not in any residue class.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Greedy(#greedy)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)