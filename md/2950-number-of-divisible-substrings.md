### Leetcode 2950 (Medium): Number of Divisible Substrings [Practice](https://leetcode.com/problems/number-of-divisible-substrings)

### Description  
Given a string of lowercase English letters, each character maps to a number from 1 to 9 (following a mapping similar to phone keypad groups: 'a','b'→1, 'c','d','e'→2, ..., 'x','y','z'→9).  
A substring is called **divisible** if the sum of its mapped values is divisible by its length.  
Your task is to count how many non-empty substrings of the given word are divisible.

### Examples  

**Example 1:**  
Input: `word = "abc"`  
Output: `6`  
Explanation:  
All single-character substrings ("a","b","c") are divisible.  
Substrings "ab" (1+1=2, length=2), "bc" (1+2=3, length=2), and "abc" (1+1+2=4, length=3) are checked.  
For “ab”: sum=1+1=2, length=2 ⇒ 2 % 2 == 0 (divisible)  
For “bc”: sum=1+2=3, length=2 ⇒ 3 % 2 ≠ 0 (not divisible)  
For “abc”: sum=1+1+2=4, length=3 ⇒ 4 % 3 ≠ 0 (not divisible)  
So, there are 6 divisible substrings (all single-letter substrings, plus “ab” and “a”).

**Example 2:**  
Input: `word = "cde"`  
Output: `6`  
Explanation:  
Mapping: c,d,e → 2,2,2  
All single-character substrings are divisible (c,d,e).  
"cd": 2+2=4 (len=2) ⇒ 4%2==0 (divisible)  
"de": 2+2=4 (len=2) ⇒ 4%2==0 (divisible)  
"cde": 2+2+2=6 (len=3) ⇒ 6%3==0 (divisible)  
Total: 3 (single) + 2 (length-2) + 1 (length-3) = 6.

**Example 3:**  
Input: `word = "xyz"`  
Output: `6`  
Explanation:  
Mapping: x=9, y=9, z=9  
All single-character substrings are divisible.  
"xy": 9+9=18 (len=2) ⇒ 18%2==0 (divisible)  
"yz": 9+9=18 (len=2) ⇒ 18%2==0 (divisible)  
"xyz": 9+9+9=27 (len=3) ⇒ 27%3==0 (divisible)  
All substrings are divisible.


### Thought Process (as if you’re the interviewee)  
To solve this:
- First, map each character in the string to its corresponding number using the provided mapping.
- The brute-force idea is O(n²): for every substring, compute its sum and see if it's divisible by its length.
- Each substring can be checked by a nested loop: for each starting index i, move end index j from i up to n-1, keep running sum, and check (sum % (j-i+1) == 0).
- All single-letter substrings are trivially divisible, since any integer is divisible by 1.
- To optimize a bit, since the length of the word can be relatively large (up to 2000), and each substring sum check can be performed in O(1) if we keep a running window sum. Since each check is still O(1), total complexity is O(n²), which should pass given n is up to 2000.
- A more optimal solution (with prefix sums) does not help much since the mapping is not additive for divisibility vs. length, so brute-force is likely as fast as feasible.

Trade-offs:
- Brute-force is simple, direct, and passes constraints.
- Memory use is low, and time complexity is quadratic but manageable for the given input size.


### Corner cases to consider  
- Word of length 1 (single letter)
- All letters mapped to the same number (e.g., word = "aaa")
- Consecutive letters from different mapping groups (e.g., "abcf")  
- The largest possible input (length = 2000)


### Solution

```python
def countDivisibleSubstrings(word: str) -> int:
    # Step 1: Create mapping: groups of letters to numbers 1-9
    mapping_groups = ["ab", "cde", "fgh", "ijk", "lmn", "opq", "rst", "uvw", "xyz"]
    char_to_num = {}
    for val, group in enumerate(mapping_groups, 1):
        for ch in group:
            char_to_num[ch] = val

    n = len(word)
    total = 0
    # Step 2: Try every substring
    for i in range(n):
        summ = 0
        # Expand substring from i to j, sum up numbers
        for j in range(i, n):
            summ += char_to_num[word[j]]
            length = j - i + 1
            # Check if sum divisible by len
            if summ % length == 0:
                total += 1
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n is the length of the string. For each of n starting indices, we extend the substring up to n, performing O(1) work.
- **Space Complexity:** O(1) excluding the mapping dictionary, or O(1) extra beyond the input. The mapping is always of constant size.



### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much longer strings (n > 10⁵)?
  *Hint: Is there a pattern in substring sums and their length modulos that could be used, like prefix sum + hash count?*

- What if the character mapping changed each query?
  *Hint: Would any preprocessing need to be adjusted, or could you handle the mapping dynamically on each run?*

- Can you optimize for repeated queries for different substrings of the same input string?
  *Hint: Is it possible to preprocess prefix sums and answer in O(1) using math properties?*


### Summary
This approach is a classical brute-force substring expansion with an optimized running sum.  
It closely follows the “count all substrings matching a custom property” pattern and is similar to hashmap + sliding window approaches for substring problems.  
The mapping-step is a minor twist, but overall, this is a direct nesting-loop substring-counting algorithm.  
This pattern of mapping-to-number + divisibility check can appear in string hash and “count subarrays/substrings with sum divisible by k” style questions.


### Flashcard
Map each character to a digit, then for every substring, check if the sum of its digits is divisible by its length using nested loops and a running sum.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting), Prefix Sum(#prefix-sum)

### Similar Problems
- Count Substrings Divisible By Last Digit(count-substrings-divisible-by-last-digit) (Hard)