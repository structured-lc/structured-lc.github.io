### Leetcode 3438 (Easy): Find Valid Pair of Adjacent Digits in String [Practice](https://leetcode.com/problems/find-valid-pair-of-adjacent-digits-in-string)

### Description  
You are given a string consisting only of digits '1'-'9'.  
A **valid pair** is defined as two adjacent digits such that:
- The two digits are **not the same**.
- For each digit in the pair, the digit appears in the string **exactly as many times as its numeric value** (e.g., '2' appears twice, '3' appears three times in the whole string).

Your task: **Return the first valid adjacent pair** found when traversing the string from left to right. If none exist, return an empty string.

### Examples  

**Example 1:**  
Input: `s = "2523533"`  
Output: `"23"`  
*Explanation: '2' and '3' are adjacent and different. The digit '2' occurs exactly 2 times, and '3' occurs exactly 3 times in the string. This is the first such valid pair found.*

**Example 2:**  
Input: `s = "221"`  
Output: `"21"`  
*Explanation: '2' and '1' are adjacent, and both meet the appearance requirement: '2' occurs 2 times, '1' occurs 1 time.*

**Example 3:**  
Input: `s = "22"`  
Output: `""`  
*Explanation: The only adjacent pair is '22'; since both are the same, it's not a valid pair.*

### Thought Process (as if you’re the interviewee)  
To solve this:
- First, **count the occurrences** of each digit in the string. This is needed because the validity of a pair depends on counts.
- Then, **traverse through the string** and examine every adjacent pair:
    - If the digits are different, check if each appears as many times as its numeric value.
    - As soon as a valid pair is found, return it.
- If we finish traversing without finding any valid pair, return "".

**Brute-force approach:** For each pair of adjacent digits, count their occurrences in every iteration — but that's unnecessary.  
**Optimized approach:**  
- Count all digits once at the beginning (just 10 possible digits).
- Then check each adjacent pair with a simple lookup per check.

This keeps the solution **efficient (O(n))**, clean, and easy to reason about.

### Corner cases to consider  
- String with all identical digits (e.g. "2222") → all pairs are same digits (invalid).
- Digits where count doesn't match their value (e.g. "23222" : '2' appears 3x, so "23" is not valid).
- String of length 2 (minimum allowed input).
- Already the first pair is valid (quick exit).
- No valid pairs at all.

### Solution

```python
def find_valid_pair(s: str) -> str:
    # Count the occurrences of each digit in the string
    count = [0] * 10  # index 1-9 used
    for ch in s:
        count[int(ch)] += 1

    # Traverse string to look for a valid adjacent pair
    for i in range(len(s) - 1):
        a = int(s[i])
        b = int(s[i + 1])
        if a != b:
            # Each digit must appear as many times as its numeric value
            if count[a] == a and count[b] == b:
                return s[i] + s[i + 1]

    # No valid pair found
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Count all digits in one pass; check each adjacent pair in a second pass.
- **Space Complexity:** O(1) — The count array is always size 10 (digits '0'-'9'), regardless of string size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the digits can include '0'?  
  *Hint: Would you need to handle 0-counts or zero as a special case?*

- How would you return **all** valid pairs, not just the first?  
  *Hint: Instead of returning immediately, collect every such pair in a result list and deduplicate as needed.*

- If the string can be very large (e.g., streaming input), can you process efficiently?  
  *Hint: Is it feasible to maintain partial counts or work in sublinear space?*

### Summary
We use a **two-pass, counting and scanning pattern**: first count every digit (frequency array), then scan for qualifying adjacent pairs.  
This is a common pattern for "frequency-based immediate checks" in strings or arrays.  
It generalizes to substring or subarray patterns requiring frequency matches, as seen in problems involving anagram checks, frequency bucketing, or sliding window techniques.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Majority Element(majority-element) (Easy)
- Contains Duplicate(contains-duplicate) (Easy)