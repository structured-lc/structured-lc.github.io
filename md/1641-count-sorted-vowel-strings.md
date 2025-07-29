### Leetcode 1641 (Medium): Count Sorted Vowel Strings [Practice](https://leetcode.com/problems/count-sorted-vowel-strings)

### Description  
Given an integer \( n \), return the number of strings of length \( n \) that can be formed using only the vowels \('a', 'e', 'i', 'o', 'u'\) and are lexicographically sorted (i.e., every character is lexicographically less than or equal to the next).

### Examples  
**Example 1:**  
Input: `n = 1`  
Output: `5`  
*Explanation: The strings are 'a', 'e', 'i', 'o', 'u'.*

**Example 2:**  
Input: `n = 2`  
Output: `15`  
*Explanation: Possible strings: "aa", "ae", "ai", ..., "uu", all pairs with order maintained (5\*6/2 = 15).*

**Example 3:**  
Input: `n = 33`  
Output: `66045`  
*Explanation: Large result for big input.*

### Thought Process (as if you’re the interviewee)  
At first, we could brute force all possible vowel strings of length \( n \) and check if they're sorted, but this is infeasible for large \( n \).

Notice that the problem is equivalent to "putting n indistinguishable balls into 5 distinct boxes" (choose \( n \) letters with weakly increasing order). This is the classic "stars and bars" problem in combinatorics. The answer is (n+5-1 choose 5-1) = (n+4 choose 4).

Thus, we can compute (n+4 choose 4) directly, with O(1) time if we use math formulas.

### Corner cases to consider  
- n = 1, n = 0  
- Large n (check for overflow)
- All characters are the same
- n is small enough for brute-force

### Solution

```python
# No external libraries in coding interviews, do math directly
def countVowelStrings(n):
    # Compute (n+4 choose 4) = (n+4) * (n+3) * (n+2) * (n+1) // 24
    res = 1
    for i in range(1, 5):
        res *= n + i
    return res // 24
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), arithmetic only.
- **Space Complexity:** O(1), just a few integer variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are only k vowels, not 5?  
  *Hint: Replace 5 with k in the combination formula.*

- What if the string has to be strictly increasing?  
  *Hint: Now, each vowel can appear at most once; answer is (n==k) ? k! : 0.*

- Can you list all valid strings?  
  *Hint: Use backtracking to generate strings in order, pruning when order is violated.*

### Summary
Combining DP and combinatorics, this is a classic "stars and bars" (multicombination) problem. The formula crops up in similar problems where you divide n indistinguishable items into k boxes, and appears often in interview combinatorics questions.