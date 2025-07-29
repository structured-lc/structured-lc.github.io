### Leetcode 1189 (Easy): Maximum Number of Balloons [Practice](https://leetcode.com/problems/maximum-number-of-balloons)

### Description  
Given a string, you need to determine **the maximum number of times you can form the word "balloon"** using the letters from that string. Each letter in the string can only be used once. For example, to form "balloon", you need:  
- b ×1  
- a ×1  
- l ×2  
- o ×2  
- n ×1  
Count how many full "balloon" words you can build with the letters provided.

### Examples  

**Example 1:**  
Input: `nlaebolko`  
Output: `1`  
Explanation:  
We can use the letters to make one "balloon" (b, a, l, l, o, o, n). There aren't enough for a second one.

**Example 2:**  
Input: `loonbalxballpoon`  
Output: `2`  
Explanation:  
We have enough letters for two "balloon":  
- b ×2, a ×2, l ×4, o ×4, n ×2  
That covers two complete sets of "balloon".

**Example 3:**  
Input: `leetcode`  
Output: `0`  
Explanation:  
There are not enough required letters for even one "balloon".

### Thought Process (as if you’re the interviewee)  
Start by identifying what is needed to form "balloon":  
- The required letters and their counts: {b:1, a:1, l:2, o:2, n:1}.  
Brute force would be to actually try to assemble "balloon" repeatedly by picking letters, but that's inefficient.

Optimized approach:  
- **Count the occurrences** of all relevant letters in the input.
- For each letter needed in "balloon", figure out how many complete words you can build. For 'l' and 'o', which occur twice in "balloon", you must use ⌊count of 'l' / 2⌋, ⌊count of 'o' / 2⌋.
- Overall answer is the **minimum** over all these required letters (since running out of any one limits you).

Trade-offs:  
- This approach is O(n) time where n is the length of the given string, and works in O(1) space since only a fixed set of letters ('b', 'a', 'l', 'o', 'n') are tracked.

### Corner cases to consider  
- Empty string (`""`) → output 0.
- Strings lacking any of the required letters → output 0.
- "balloon" letters present but not enough for a full set (e.g., missing a single 'l' or 'o').
- Input with a lot of irrelevant letters: should be ignored.
- Large input (up to 10⁴) — must be efficient.

### Solution

```python
def maxNumberOfBalloons(text):
    # Count the frequency of each character in the input
    count = {}
    for ch in text:
        if ch in "balon":  # only track relevant chars
            count[ch] = count.get(ch, 0) + 1

    # For 'l' and 'o', we need them twice per "balloon"
    # For others, once per balloon
    max_balloons = float('inf')
    # List of required letters and divisors
    requirements = [('b', 1), ('a', 1), ('l', 2), ('o', 2), ('n', 1)]

    for letter, divisor in requirements:
        max_balloons = min(
            max_balloons,
            count.get(letter, 0) // divisor
        )
    return max_balloons if max_balloons != float('inf') else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of input string, since every character is visited once.
- **Space Complexity:** O(1), only a fixed set of five counters for 'b', 'a', 'l', 'o', 'n' are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the target word changes but is still constant for many queries?  
  *Hint: How might your letter-counting logic change if the word is not always "balloon" but another fixed word?*

- Can you generalize this to count the number of times any arbitrary word can be formed?  
  *Hint: Think about dynamically building the requirements dictionary based on the target word.*

- If the input is very large, how could you optimize memory usage further?  
  *Hint: Processing the input lazily, or early exit if impossible, etc.*

### Summary
This problem is an example of the "counter/frequency map" pattern, common in string problems that ask for assembling words or anagrams given letter availability. It generalizes to any problem where you must form target sets with fixed frequency requirements, such as building ransom notes, anagrams, or recipes from ingredients. The main insight is to count and limit by the bottleneck character.