### Leetcode 389 (Easy): Find the Difference [Practice](https://leetcode.com/problems/find-the-difference)

### Description  
You are given two strings, s and t. The string t is constructed by shuffling the characters of s and then adding one extra character at a random position. Your task is to find the letter that was added in t, compared to s. Return that extra character as your answer.

### Examples  

**Example 1:**  
Input: `s = "abcd", t = "abcde"`  
Output: `"e"`  
*Explanation: s got shuffled into some order and then ‘e’ was added. So the extra letter is ‘e’.*

**Example 2:**  
Input: `s = "", t = "y"`  
Output: `"y"`  
*Explanation: s is empty, t has only character 'y'. So 'y' is the extra character.*

**Example 3:**  
Input: `s = "aabbc", t = "ababbc"`  
Output: `"b"`  
*Explanation: All letters match, except there is an extra 'b' in t.*

### Thought Process (as if you’re the interviewee)  
First, I would clarify whether the inputs could contain any characters and if their lengths are just one apart (since t includes all of s plus one letter).  
A brute-force solution would be to use two loops: for each character in t, check its count in s, and vice versa. But that’s slow.  
A better approach is to count the frequency of each character in both s and t using a hash map or array. We check the character with a higher frequency in t or that appears only in t—that character is the answer.  
For optimality, I’d mention another trick: using XOR. If I XOR all characters in s and t together, matches cancel out and only the added character remains (since `a ^ a = 0`). This has O(n) time and O(1) space, so in interviews, I would describe both methods and pick XOR for its efficiency.

### Corner cases to consider  
- **Empty String:** s is empty, so t has only one character.
- **Repeated Characters:** s and t have repeating letters, but t has one letter one more time.
- **All Characters Same:** s = "aaa", t = "aaaa".
- **Letters Not in Alphabetical Order:** s and t are shuffled randomly.
- **Extra Letter at Start/End/Middle:** The added character can be at any position in t.

### Solution

```python
def findTheDifference(s: str, t: str) -> str:
    # Initialize result variable to 0
    result = 0
    
    # XOR all characters from s
    for char in s:
        result ^= ord(char)
    
    # XOR all characters from t
    for char in t:
        result ^= ord(char)
    
    # The result now represents the ASCII of the extra character
    return chr(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(s) + len(t). Both strings are traversed once, so the operations are linear.
- **Space Complexity:** O(1), since we use only a single extra integer variable regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be more than one extra character in t?
  *Hint: How would you adapt your character counting structure?*
- Can you do it without any extra space and without modifying the strings?
  *Hint: Does your solution touch only variables, or does it use any data structures?*
- How would you handle Unicode characters or non-English input?
  *Hint: What type of conversion are you using on each character?*

### Summary
This is a classic string manipulation problem and demonstrates both the **hashmap** (frequency counting) and the **bitwise XOR** trick techniques. The solution showcases a common pattern—using properties of operations (like XOR) to reduce space complexity. This XOR pattern appears in other interview problems too, such as finding single non-duplicate elements in arrays, and is widely applicable anywhere elements appear in pairs except for a unique one.