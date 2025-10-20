### Leetcode 299 (Medium): Bulls and Cows [Practice](https://leetcode.com/problems/bulls-and-cows)

### Description  
You are given two strings, **secret** and **guess**, which are both of equal length and composed of digits 0-9. Your job is to evaluate the guess against the secret and return a "hint" that tells:
- How many digits in guess are exactly the same as secret (both in digit and position) — called **bulls**.
- How many digits are correct in value but in the wrong position — called **cows**.

The result should be formatted as `xAyB`, where:
- `x` is the number of bulls (exact matches),
- `y` is the number of cows (correct digit, wrong position).

Duplicates and digit reuse must be handled carefully: each digit in secret and guess may only count towards one bull or cow.

### Examples  

**Example 1:**  
Input: `secret = "1807"`, `guess = "7810"`  
Output: `"1A3B"`  
*Explanation: Position 1: 8 (bull); Cows: digits 1, 0, and 7 are present but not in their correct locations. Only 8 is in the matching position.*

**Example 2:**  
Input: `secret = "1123"`, `guess = "0111"`  
Output: `"1A1B"`  
*Explanation: Bull: first 1 matches; Cows: only one of the unmatched 1's from guess matches a non-bull 1 in secret. 0 and 3 do not match at all.*

**Example 3:**  
Input: `secret = "1"`, `guess = "0"`  
Output: `"0A0B"`  
*Explanation: No matching digits; both digit and position are wrong.*

### Thought Process (as if you’re the interviewee)  
- First, compare each digit in secret and guess at the same position:
  - If they match, increment the **bulls** counter.
  - Else, record the frequency of unmatched digits separately for secret and guess.
- For **cows**, after the bulls have been counted, check the count of each digit (0-9) in the non-bull leftovers of both secret and guess. For each digit, the number of cows contributed is the minimum of its count in secret and guess.
- Duplicates are tricky: Each digit from secret or guess can only be counted once, so ensure that for cows, only unused instances are considered.

A brute-force approach would use nested loops, but this leads to O(n²) time. Instead, we can achieve O(n) time and O(1) space (since digits are 0-9 — only 10 possible) by using two arrays to count leftovers.

### Corner cases to consider  
- All digits of secret and guess are different (`"123"`, `"456"` → `0A0B`)
- All digits and positions match (`"6789"`, `"6789"` → `4A0B`)
- Repeated numbers (`"1112"`, `"1211"`)
- Single-character strings
- Strings with all identical digits (`"0000"`, `"0000"`)
- Cases where only bulls or only cows exist
- Length at lower and upper bounds (1, 1000)

### Solution

```python
def getHint(secret: str, guess: str) -> str:
    # To store bulls (exact matches)
    bulls = 0
    # To store counts of unmatched digits in secret and guess
    secret_counts = [0] * 10
    guess_counts = [0] * 10

    for s_digit, g_digit in zip(secret, guess):
        if s_digit == g_digit:
            bulls += 1
        else:
            # Count unmatched digits for cows later
            secret_counts[int(s_digit)] += 1
            guess_counts[int(g_digit)] += 1

    # For cows, sum the minimum count for each digit between secret and guess counts
    cows = 0
    for d in range(10):
        cows += min(secret_counts[d], guess_counts[d])

    return f"{bulls}A{cows}B"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single pass over each character to compare, and then a constant 10 for digits when calculating cows.
- **Space Complexity:** O(1) — Only 10 elements per digit in secret_counts and guess_counts, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the input could include lowercase letters?  
  *Hint: Use larger count arrays or dictionaries to track all possible characters.*

- Can you solve it in one pass without separate counting arrays?  
  *Hint: Try matching and counting bulls/cows simultaneously, possibly with clever one-pass bookkeeping.*

- What if the output should include the positions of bulls?  
  *Hint: Return a list of indices along with the count.*

### Summary
This problem uses a “counting” pattern and careful bookkeeping with arrays to separate exact matches (bulls) from partial (cows). It's a classic digit/character counting task and shows up in problems where you need to compare multi-set relations, deal with duplicates, and track correct vs wrong positions. Variants appear in interview problems on anagrams, inventory matching, and card games.


### Flashcard
First pass counts bulls (exact position matches); second pass uses frequency arrays for remaining digits to count cows as min(secret_freq, guess_freq) per digit.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Make Number of Distinct Characters Equal(make-number-of-distinct-characters-equal) (Medium)