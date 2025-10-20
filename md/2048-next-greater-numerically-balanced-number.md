### Leetcode 2048 (Medium): Next Greater Numerically Balanced Number [Practice](https://leetcode.com/problems/next-greater-numerically-balanced-number)

### Description  
Given an integer n, find the smallest **numerically balanced** number strictly greater than n.  
A numerically balanced number is an integer where, for each digit d that appears in it, there are exactly d occurrences of the digit d in the number. For example, 122 is numerically balanced because it contains one '1' and two '2's.  
Your goal is, given any integer n (0 ≤ n ≤ 10⁶), to return the next greater integer that is numerically balanced.

### Examples  

**Example 1:**  
Input: `1`  
Output: `22`  
*Explanation: 22 is numerically balanced since the digit 2 occurs 2 times. It is the smallest numerically balanced number greater than 1.*

**Example 2:**  
Input: `1000`  
Output: `1333`  
*Explanation: 1333 contains one '1' and three '3's. Both satisfy the balance condition. 1022 is invalid because the digit 0 cannot appear more than 0 times.*

**Example 3:**  
Input: `3000`  
Output: `3133`  
*Explanation: 3133 contains one '1' and three '3's. Both satisfy the balance property and it is the smallest such number above 3000.*

### Thought Process (as if you’re the interviewee)  

- Start by formalizing what it means for a number to be numerically balanced:  
  For all d in the number, the count of d == d.
- The naive brute-force is to increment n, check each new number, and stop when one is numerically balanced.
- For the check: Count digit frequencies in the number. For each unique digit, check if the count equals the digit value.
- Most numbers are not numerically balanced, but the constraints (n ≤ 10⁶) are small. The brute-force will work but can be slow if n is large.
- For optimization: Precompute/candidate-generate possible numerically balanced numbers up to a given length (since only a handful exist up to a certain number of digits) and binary search or iterate among those.
- For a live interview, the brute-force with an efficient check (counting digits) is sufficient and easy to understand.

### Corner cases to consider  
- n is already numerically balanced – must find *strictly* greater number.
- n is very close to a much larger numerically balanced number (like after 999, the next is 1333).
- Shouldn’t include digit 0, since the frequency condition can never be satisfied for 0.
- All digits must be checked, not just one of them.
- Multiple digits (ex: 1333) must all satisfy their respective counts.
- n = 0, min(numerically balanced) is 1.
- Large values for n; must not go into infinite loop.
- Numbers with repeated digits that do not satisfy the condition (ex: 555 is not numerically balanced, since it has three '5's, not five).

### Solution

```python
def next_beautiful_number(n):
    # Helper to check if a number is numerically balanced
    def is_balanced(num):
        digit_count = [0] * 10  # count for each digit 0..9
        for ch in str(num):
            digit_count[int(ch)] += 1
        for d in set(str(num)):
            digit = int(d)
            if digit_count[digit] != digit:
                return False
        return True
    
    # Search starting from n + 1
    candidate = n + 1
    while True:
        if is_balanced(candidate):
            return candidate
        candidate += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K × D), where K is the gap between n and the next balanced number, and D is the number of digits (since each check is O(D)). Practically fast since balanced numbers are sparse and n ≤ 10⁶, so worst-case is modest.
- **Space Complexity:** O(1). Only a fixed-size digit frequency array and integer variables are used; space does not grow with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if n could be up to 10¹⁸?
  *Hint: Generate all valid numerically balanced numbers up to a certain length and use binary search.*
- Can you pre-generate and cache all numerically balanced numbers with up to 7 digits?
  *Hint: Use backtracking to construct all combinatorial possibilities, store and search.*
- How would you modify is_balanced to avoid unnecessary string/int conversions?
  *Hint: Operate on integers directly using modulo/division.*

### Summary
This problem is a classic example of the **brute-force with a property-check** coding pattern.  
The solution loops until it finds the next number matching a rare property, checking via digit counting each time.  
With small enough constraints, this approach is effective and easy to read—ideal for interviews, as it trades a bit of efficiency for clarity.  
The pattern frequently applies when finding next/previous numbers matching constraints (e.g., the next palindrome, next number with unique digits, etc.).


### Flashcard
Increment n and check each number for digit balance (count of d == d)—brute-force is feasible due to small constraint.

### Tags
Hash Table(#hash-table), Math(#math), Backtracking(#backtracking), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
- Find the Width of Columns of a Grid(find-the-width-of-columns-of-a-grid) (Easy)