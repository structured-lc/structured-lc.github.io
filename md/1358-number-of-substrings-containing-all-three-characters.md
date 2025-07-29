### Leetcode 1358 (Medium): Number of Substrings Containing All Three Characters [Practice](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters)

### Description  
Given a string **s** containing only the characters 'a', 'b', and 'c', return the number of substrings of **s** that contain at least one occurrence of all three characters.  
A substring is any contiguous part of the string; the goal is to count how many such substrings include at least one 'a', one 'b', and one 'c'.

### Examples  

**Example 1:**  
Input: `s = "abcabc"`  
Output: `10`  
*Explanation: The substrings containing all three characters are: "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc", and "abc".*

**Example 2:**  
Input: `s = "aaacb"`  
Output: `3`  
*Explanation: The substrings are: "aaacb", "aacb", "acb".*

**Example 3:**  
Input: `s = "abc"`  
Output: `1`  
*Explanation: The only substring is "abc" itself, which contains all three characters.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Try all possible substrings using two loops and check if each contains at least an 'a', a 'b', and a 'c' by traversing/keeping a set. This is O(n³) as you have O(n²) substrings and O(n) to check each.

- **Optimized approach – Sliding Window:**  
  We want an O(n) solution, as the constraints go up to 5 × 10⁴.  
  - The idea: Use a window [left, right]. Move right pointer to include new characters and keep track of the counts of 'a', 'b', 'c' in a dict/counter.
  - When the window contains at least one of each ('a', 'b', 'c'), *all substrings starting at left and ending at or after right will also satisfy the requirement*. For each right, the number of such substrings is (n - right). Move left forward until the window is invalid again, updating counts as you go.

- **Why this works:**  
  Once the window contains all three, further increasing right won't reduce that set, so for current left and any position right or further, substrings starting at left and ending at any such right are valid.

- **Alternative approach (Last Seen):**  
  Keep track of the last occurrence of 'a', 'b', and 'c'. At each index, the minimum last occurrence tells you the earliest right boundary to make a valid substring.

- **Final choice:**  
  Sliding window or last-seen; both are O(n) with O(1) space—both are optimal.

### Corner cases to consider  
- Short string, e.g. s = "ab", length < 3 → output 0.
- Only one occurrence of each char, e.g. s = "abc".
- All characters are the same, e.g. s = "aaaaa".
- String starts or ends with all three together, e.g. s = "abcaaaa", "aaaabc".
- Empty string (not allowed by constraints, but good to reason about).
- Very large strings.

### Solution

```python
def numberOfSubstrings(s):
    # Counts of 'a', 'b', 'c' in the current window
    count = {'a': 0, 'b': 0, 'c': 0}
    n = len(s)
    res = 0
    left = 0

    for right in range(n):
        # Include s[right] to the window
        count[s[right]] += 1

        # While the window contains at least one 'a','b','c',
        # move left forward (minimize window)
        while count['a'] > 0 and count['b'] > 0 and count['c'] > 0:
            # All substrings starting at left and ending from right to n-1 are valid
            res += n - right
            # Move left forward and update the count
            count[s[left]] -= 1
            left += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since both pointers left and right move at most n times each, and all per-iteration work is O(1).
- **Space Complexity:** O(1), only a fixed dictionary for 'a', 'b', 'c', regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string could contain more than three different characters and you wanted substrings containing *all* distinct characters present?
  *Hint: Use a variable set of counters and all present characters.*

- Suppose you only wanted the number of substrings containing at least one 'a' *and* one 'b' (not necessarily 'c'). How would you change the logic?
  *Hint: Adjust sliding window requirement.*

- Could you output all such substrings instead of just counting them?
  *Hint: Will impact time and space; collecting all substrings explicitly requires O(n²).*

### Summary
- This problem is a classic **sliding window**/two-pointer technique—recognize when *all substrings* from a valid window are valid and how to count them efficiently.
- The trick is realizing that, for each valid window, its right endpoint gives you (n - right) valid substrings starting at left.
- Pattern appears everywhere: substring/array range querying, smallest window containing all elements, minimum covering substring.