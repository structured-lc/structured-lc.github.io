### Leetcode 344 (Easy): Reverse String [Practice](https://leetcode.com/problems/reverse-string)

### Description  
Given an array of characters, reverse the array in place (do not allocate extra space for another array). You must modify the input array by swapping characters toward the center, so the string reads backward. The function should not return anything. In Python, the problem receives a list of characters (e.g. `['h', 'e', 'l', 'l', 'o']`) rather than a string, to enforce in-place modification.

### Examples  

**Example 1:**  
Input: `["h", "e", "l", "l", "o"]`  
Output: `["o", "l", "l", "e", "h"]`  
*Explanation: Swap the first and last elements, then the second and second-last. In the end, the list is reversed.*

**Example 2:**  
Input: `["H", "a", "n", "n", "a", "h"]`  
Output: `["h", "a", "n", "n", "a", "H"]`  
*Explanation: The first and last letters swap, then work inward, swapping each pair until the list is fully reversed.*

**Example 3:**  
Input: `["a", "b"]`  
Output: `["b", "a"]`  
*Explanation: Only two characters, so swap directly.*

### Thought Process (as if you’re the interviewee)  
My first thought is to use a built-in method, but that's not allowed since we must reverse the array in-place and avoid allocating extra space.

A brute-force (but incorrect) approach would be to create a new reversed list, but that's not in-place.

**Optimized approach:**  
- Use two pointers: `left` at the start (0) and `right` at the end (len(s)-1).
- Swap values at positions `left` and `right`.
- Move `left` forward and `right` backward.
- Stop when `left` ≥ `right`.
This way, each character is swapped only once, giving O(n) time and O(1) space.  
This is a classic two-pointer pattern for in-place reversal. It's clear, simple, and doesn't require extra space.[1][5][2]

### Corner cases to consider  
- Empty array: `[]` (should remain empty)
- One character: `["x"]` (should remain as is)
- Even/odd length arrays (to ensure swapping logic is correct)
- Array with repeating characters: `["a", "a", "a"]`  
- Very large array (test time complexity)
- Palindrome: `["r", "a", "c", "e", "c", "a", "r"]` (should stay the same after reversal)

### Solution

```python
def reverseString(s):
    """
    Reverses the list of characters in-place.
    :type s: List[str]
    :rtype: None, modifies s in-place.
    """
    left, right = 0, len(s) - 1
    while left < right:
        # Swap values at left and right
        s[left], s[right] = s[right], s[left]
        # Move pointers toward center
        left += 1
        right -= 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the list. Each character is swapped exactly once as the pointers meet in the middle.[1][2][5]
- **Space Complexity:** O(1), since only two pointers (variables) are used, regardless of the input size. No extra data structures are created.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you reverse a string if you could only use recursion?
  *Hint: Think about swapping the first and last letters, then call recursively for the “inside” substring.*

- If you had to return a reversed copy without modifying the original, how would you do it?
  *Hint: Use slicing, a loop to build a new list, or a built-in reversed function.*

- How would you reverse a linked list in place?
  *Hint: The technique is similar in spirit, but you’ll need to rewire the node pointers.*

### Summary
This problem uses the **two-pointer swapping pattern**, which is common for reversing an array or subarray in-place, partitioning, or palindrome checks. It's an essential building block for problems involving symmetric updates or in-place rearrangement, and understanding it makes tackling more advanced problems (such as reversing linked lists or certain window algorithms) much easier.