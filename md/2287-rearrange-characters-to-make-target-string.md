### Leetcode 2287 (Easy): Rearrange Characters to Make Target String [Practice](https://leetcode.com/problems/rearrange-characters-to-make-target-string)

### Description  
You are given two strings, **s** and **target**. You can take letters from **s** (in any order, each character at most once) to try to form copies of **target**. The goal is to figure out the **maximum number of copies** of **target** that you can form using the letters from **s**. Order doesn’t matter, but you must have enough of each character in **target** to form a full copy.

### Examples  

**Example 1:**  
Input: `s = "ilovecodingonleetcode", target = "code"`  
Output: `2`  
*Explanation: In "ilovecodingonleetcode", you can form "code" twice because there are at least 2 c's, 2 o's, 2 d's, and 2 e's. After using up those, there aren't enough c's or d's left for a third copy.*

**Example 2:**  
Input: `s = "abcba", target = "abc"`  
Output: `1`  
*Explanation: You can only form "abc" once, since there's only one 'c'.*

**Example 3:**  
Input: `s = "abbaccaddaeea", target = "aaaaa"`  
Output: `2`  
*Explanation: There are 6 'a's in s and target requires 5 each time. You can form "aaaaa" once, with one 'a' leftover (not enough for a second copy). Actually, 6 // 5 is 1, so the correct output is 1.*

### Thought Process (as if you’re the interviewee)  
First, let's count how many times each character appears in **s** and in **target**.  
To form one copy of **target**, we need a certain number of occurrences of each character present in **target**.  
So, for each character in **target**, we compute:  
- How many times does it appear in **s**?
- How many times do we need it for **target**?

The number of copies we can form is limited by the character that "runs out the fastest," i.e., the minimum value across all characters in **target** of (count in s) // (count in target).

Naive ideas like generating all permutations are incredibly inefficient and unnecessary.  
Final approach:  
- Count characters in both strings
- For each character in target, get floor(count_in_s / count_in_target)
- The answer is the minimum of those values across all unique characters in target.

### Corner cases to consider  
- **s** or **target** is empty  
- Characters in **target** not present in **s** at all  
- Multiple duplicate letters in **target**  
- s shorter than target  
- All of s is made up of the same letter as target  
- s has just enough for one copy  
- target has all unique letters  
- target is longer than s  

### Solution

```python
def rearrangeCharacters(s, target):
    # Step 1: Count characters in s
    s_count = [0] * 26  # 26 lowercase english letters
    for ch in s:
        idx = ord(ch) - ord('a')
        s_count[idx] += 1

    # Step 2: Count characters in target
    t_count = [0] * 26
    for ch in target:
        idx = ord(ch) - ord('a')
        t_count[idx] += 1

    # Step 3: For each char in target, 
    # calculate max copies we can make from s
    min_copies = float('inf')
    for i in range(26):
        if t_count[i] > 0:
            # Floor division, avoid div by 0
            copies = s_count[i] // t_count[i]
            if copies < min_copies:
                min_copies = copies

    return min_copies if min_copies != float('inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(s), m = len(target), since we scan both strings once and do 26 constant-time checks (for a-z).
- **Space Complexity:** O(1) since we're only using two fixed-size arrays (length 26) for letter counts.

### Potential follow-up questions (as if you’re the interviewer)  

- What if **s** and **target** could contain uppercase and lowercase letters?
  *Hint: How would your counting change if you had to differentiate case or handle 52 letters?*

- How would your approach change if **unicode** or non-English letters were involved?
  *Hint: Would fixed-size arrays still work?*

- Suppose **s** and **target** are both extremely long; can you optimize further for memory or speed?
  *Hint: Would a streaming/one-pass solution be helpful?*

### Summary
This is a classic **hash-map/counting** pattern where you count frequencies to figure out resource allocation. You find the limiting resource by computing the minimum number of complete sets you can assemble. This technique can also be seen in problems like "ransom note" creation, anagram checking, and inventory stock checks.