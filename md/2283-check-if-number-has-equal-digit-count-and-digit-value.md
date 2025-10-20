### Leetcode 2283 (Easy): Check if Number Has Equal Digit Count and Digit Value [Practice](https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value)

### Description  
Given a string `num` of length n comprised of digits '0'-'9', determine if the iᵗʰ digit in `num` equals the total number of times digit i appears in the string for every index i (that is, for every position 0 ≤ i < n, the number at `num[i]` represents how many times digit i occurs in `num`).  
Return `True` if this holds for all i, else return `False`.

### Examples  

**Example 1:**  
Input: `num = "1210"`  
Output: `True`  
*Explanation:*
- Position 0: num = '1' → digit 0 occurs 1 time
- Position 1: num[1] = '2' → digit 1 occurs 2 times
- Position 2: num[2] = '1' → digit 2 occurs 1 time
- Position 3: num[3] = '0' → digit 3 occurs 0 times

**Example 2:**  
Input: `num = "030"`  
Output: `False`  
*Explanation:*
- Position 0: num = '0' → digit 0 occurs 1 time (but should occur 0 times)
- Already fails, so we return False.

**Example 3:**  
Input: `num = "42101000"`  
Output: `True`  
*Explanation:*
- num='4' → digit 0 appears 4 times
- num[1]='2' → digit 1 appears 2 times
- num[2]='1' → digit 2 appears 1 time
- num[3]='0' → digit 3 appears 0 times
- num[4]='1' → digit 4 appears 1 time
- num[5]='0' → digit 5 appears 0 times
- num='0' → digit 6 appears 0 times
- num='0' → digit 7 appears 0 times

### Thought Process (as if you’re the interviewee)  
First, I’d clarify the mapping: num[i] tells us how many times digit i should appear in the string. The order of the string matters only for indexing; we’re being asked to check for a self-describing number.

Naive approach:  
- For each i from 0 to n-1, count the occurrences of digit str(i) in `num`.  
- Compare this count to int(num[i]).  
- If for any i they don't match, return False. Otherwise, return True.

Optimized approach:  
- Instead of counting for each i (which would be O(n²)), first count occurrences of each digit '0'-'9' in one pass (using an integer array of size 10).
- Then for each i from 0 to n-1, simply compare count[i] to int(num[i]).
- This reduces to O(n) time and O(1) space (since count array is size 10).

Trade-offs:  
- No real need for further optimization as the string length is at most 100 (for LeetCode), so a constant sized count array is simple and efficient.

### Corner cases to consider  
- String of length 1 (e.g., num="1" or num="0").
- Digits beyond the string length (digits > n-1) do not matter.
- Digits ‘0’ that are expected to be present at positions where the count is not zero.
- Leading zeros (e.g., num="001").
- Strings with all zeros except one position.
- All counts are correct except for one mismatch.

### Solution

```python
def digitCount(num: str) -> bool:
    # Count occurrences of each digit (as character) in num
    count = [0] * 10  # Since digits are '0'-'9'
    for c in num:
        count[int(c)] += 1

    # For each index, verify that num[i] == count[i] (as string vs integer)
    n = len(num)
    for i in range(n):
        if int(num[i]) != count[i]:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)<br>
  One pass to count digits (O(n)), and one pass to verify for each i (O(n)). n = len(num).
- **Space Complexity:** O(1)<br>
  The count array is size 10 regardless of n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if num contains non-numeric characters?  
  *Hint: Consider input validation or assume constraints by problem.*

- How would you modify if the mapping were from digit value to arbitrary positions?  
  *Hint: Mapping would not be index-based; may need a dictionary.*

- Can you generate all such "self-describing numbers" of length n?  
  *Hint: Try all permutations/constructive enumeration with constraints.*

### Summary
This problem demonstrates the **counting/frequency table** pattern, commonly used for verifying conditions based on digit/letter frequency in a fixed-size input. This approach (count and verify) is broadly applicable to problems involving digit, letter or element frequencies, and is especially effective when there is a fixed range (here, digits 0–9). Similar techniques are used in anagram problems, palindrome checks, and digit-based puzzles.


### Flashcard
For each digit i, count its occurrences in the string and compare to the value at num[i]; all must match.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Self Dividing Numbers(self-dividing-numbers) (Easy)