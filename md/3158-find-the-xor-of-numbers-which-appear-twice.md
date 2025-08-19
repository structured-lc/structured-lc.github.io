### Leetcode 3158 (Easy): Find the XOR of Numbers Which Appear Twice [Practice](https://leetcode.com/problems/find-the-xor-of-numbers-which-appear-twice)

### Description  
Given an integer array `nums`, where every integer appears either once or exactly twice, return the bitwise XOR of all the numbers that appear **twice**. If no number appears twice, return 0.  
In other words:  
- For each number in `nums`, count how many times it appears.
- Take all numbers that appear **exactly twice**, and XOR them together.
- If there are no such numbers, return 0.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 1, 3]`  
Output: `1`  
*Explanation: Only 1 appears twice, so the answer is 1.*

**Example 2:**  
Input: `nums = [1, 2, 3]`  
Output: `0`  
*Explanation: No number appears twice, so return 0.*

**Example 3:**  
Input: `nums = [4, 5, 6, 4, 5, 7, 8]`  
Output: `1`  
*Explanation: 4 and 5 both appear twice, so 4 ⊕ 5 = 1.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  I could scan every number and count how many times it appears by comparing it with the rest, then pick only those appearing exactly twice. But this would give O(n²) time because for each item I would re-count all.

- **Optimize with a hashmap:**  
  A better way is to count occurrences in one pass using a dictionary (hashmap), keeping mapping: number → count.  
  After that, collect all numbers whose count is 2, and calculate their XOR using a loop:  
  XOR = num₁ ⊕ num₂ ⊕ ... ⊕ numₖ, where every numᵢ appears exactly twice.

- **If no such numbers:**  
  If the list is empty (no duplicates), return 0 (since XOR over empty set is 0).

- **Why choose this?**  
  - Time: Counting all elements + iterating over dictionary keys is both O(n).
  - Space: O(n) for the hashmap, but no way to do better since we need to count occurrences.
  - This method is easy to code, clear to read, and works for all edge cases.

- **Array-indexed optimization:**  
  If input is constrained (for ex: numbers in [1, 50]), we could use an array of size 50 instead of a hashmap. This gives the same time, but less code and less overhead.

### Corner cases to consider  
- Empty array: `[]` (should return 0)  
- All numbers unique  
- All numbers appear exactly twice  
- Only one number appearing twice  
- Large/small numbers, negative numbers (if allowed: but usually LeetCode restricts to positive for such problems)  
- Array of length 1  
- Array of length 2, no repeats  
- Array of length 2, same number twice  
- Multiple numbers appearing twice  
- No numbers appearing twice

### Solution

```python
def duplicateNumbersXOR(nums):
    # Count occurrences of each number
    count = {}
    for num in nums:
        if num in count:
            count[num] += 1
        else:
            count[num] = 1

    xor_result = 0
    # XOR all numbers that appear exactly twice
    for num, freq in count.items():
        if freq == 2:
            xor_result ^= num

    return xor_result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  One pass through nums (n elements), one pass through up to n unique keys (but overall, O(n)).

- **Space Complexity:** O(n)  
  Worst case, all numbers are unique, hashmap holds n items.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the XOR of all numbers that appear more than once (e.g., twice or thrice, etc)?  
  *Hint: Generalize the frequency condition in the counting step.*

- What if the array is read-only, and you cannot modify or create extra space proportional to n?  
  *Hint: Is there a "mathematical" way similar to other XOR or const-space problems?*

- What if the range of values is small (e.g., 1 ≤ num ≤ 50)?  
  *Hint: Use a counting array for O(1) space overhead.*

### Summary
This is a classic hash map counting pattern: count frequency, apply a rule, and reduce with a simple operation (here, XOR). The coding pattern is extremely useful for *group by and reduce* problems and applies to many LeetCode problems about frequency or duplicates (e.g., finding pairs, counting unique or repeated elements). For value ranges bounded and small, array-based counting is a practical substitute for even faster code.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Single Number(single-number) (Easy)
- Single Number II(single-number-ii) (Medium)
- Single Number III(single-number-iii) (Medium)