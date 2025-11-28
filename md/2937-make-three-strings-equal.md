### Leetcode 2937 (Easy): Make Three Strings Equal [Practice](https://leetcode.com/problems/make-three-strings-equal)

### Description  
Given three strings s1, s2, and s3, you can perform the following operation any number of times: select any string whose length is at least 2 and delete its rightmost character. The goal is to find the minimum total number of operations to make all three strings equal. If it's impossible, return -1.

### Examples  

**Example 1:**  
Input: `s1 = "abc", s2 = "abb", s3 = "ab"`  
Output: `2`  
*Explanation: Remove one character from s1 ("abc" → "ab") and one from s2 ("abb" → "ab") to make all three strings equal.*

**Example 2:**  
Input: `s1 = "dac", s2 = "bac", s3 = "cac"`  
Output: `-1`  
*Explanation: The first characters are all different, so there is no way to make the strings equal, even after deletions.*

**Example 3:**  
Input: `s1 = "a", s2 = "a", s3 = "a"`  
Output: `0`  
*Explanation: All three strings are already equal, so no operations are needed.*

### Thought Process (as if you’re the interviewee)  
First, observe that you can only delete from the right end; that means the leftmost characters cannot be changed, so the common string must be a prefix of all three.  
A brute-force method could be to try all possible shortened versions from the right, but since only the prefix matters, it’s efficient to look for the longest common prefix among the three strings.  
Count how many characters are not in the common prefix for each string; sum these counts for the answer.  
If the first character isn't the same in all three (i.e., longest common prefix of length 0), immediately return -1.

### Corner cases to consider  
- All input strings are already equal  
- All input strings have no common prefix (first characters differ)  
- Some strings of length 1  
- All strings of length 1 but different characters  
- All three strings are different  
- Two strings are identical, one differs  
- Input strings of maximum length (100)

### Solution

```python
def findMinimumOperations(s1: str, s2: str, s3: str) -> int:
    # Find the length of common prefix among s1, s2, s3
    min_len = min(len(s1), len(s2), len(s3))
    common_prefix = 0
    for i in range(min_len):
        if s1[i] == s2[i] == s3[i]:
            common_prefix += 1
        else:
            break
    # If there is no common prefix at all, cannot make strings equal
    if common_prefix == 0:
        return -1
    # Calculate the total operations needed to reduce all to the common prefix
    return len(s1) - common_prefix + len(s2) - common_prefix + len(s3) - common_prefix
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = min(len(s1), len(s2), len(s3)), due to one pass to find the common prefix.
- **Space Complexity:** O(1), uses a constant amount of extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could delete characters from anywhere in a string, not just from the right?
  *Hint: How would the longest common subsequence or prefix change the solution?*

- How would you handle the case with k strings instead of 3?
  *Hint: Can your prefix logic generalize to k inputs?*

- What if the operation allowed adding characters to any string as well as deleting?
  *Hint: Does edit distance come into play?*

### Summary
This problem is a classic case of reducing multiple strings to their *longest common prefix* using right-end trimming. The optimal solution uses a single linear scan and is both time and space efficient. The same approach and reasoning pattern are common in problems involving operations restricted to ends of collections or arrays (e.g., string trimming, prefix logic), and can often be generalized to multiple strings or different allowed operations.


### Flashcard
Find the longest common prefix of all three strings. The answer is the sum of characters not in the prefix for each string; if prefix is empty, return -1.

### Tags
String(#string)

### Similar Problems
- Delete Operation for Two Strings(delete-operation-for-two-strings) (Medium)