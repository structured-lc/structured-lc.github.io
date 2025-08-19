### Leetcode 744 (Easy): Find Smallest Letter Greater Than Target [Practice](https://leetcode.com/problems/find-smallest-letter-greater-than-target)

### Description  
Given a sorted (non-decreasing) array of lowercase English letters called **letters**, and a target lowercase letter **target**, find the **smallest letter** in the array that is strictly greater than **target**. The array is considered **circular**, meaning if no letter is strictly greater, you must return the first letter in the array.  
For example, if letters = ['c','f','j'] and target = 'j', since 'j' is the last, wrap around and return 'c'.

### Examples  

**Example 1:**  
Input: `letters = ["c", "f", "j"], target = "a"`  
Output: `"c"`  
*Explanation: 'c' is the smallest letter greater than 'a'.*

**Example 2:**  
Input: `letters = ["c", "f", "j"], target = "c"`  
Output: `"f"`  
*Explanation: 'f' is the next letter after 'c'.*

**Example 3:**  
Input: `letters = ["c", "f", "j"], target = "d"`  
Output: `"f"`  
*Explanation: 'f' is the smallest letter greater than 'd'.*

**Example 4:**  
Input: `letters = ["c", "f", "j"], target = "j"`  
Output: `"c"`  
*Explanation: As letters wrap around and there is nothing larger than 'j', so the smallest is 'c'.*

**Example 5:**  
Input: `letters = ["c", "f", "j"], target = "k"`  
Output: `"c"`  
*Explanation: All letters are less than or equal to 'k', so we return the first letter, 'c'.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Iterate through the array and return the first letter that is strictly greater than the target.
  - If you never find such a letter, return the first letter.
  - This would take O(n) time and does not use the fact that the array is sorted.

- **Optimized approach (binary search):**  
  - The array is sorted, which hints at binary search.
  - Use two pointers (`left = 0`, `right = len(letters) - 1`) to perform binary search.
  - At each step, if letters[mid] ≤ target, move left pointer to mid + 1. Otherwise, move right pointer to mid - 1.
  - When left exits the loop, it will be the index of the smallest letter greater than target, or will be equal to len(letters) if all are ≤ target.
  - To handle the circular nature, return letters[left % len(letters)], which wraps around and gives the first element if left == len(letters).
  - Binary search reduces the time to O(log n) which is much better for large arrays.

### Corner cases to consider  
- Target is the largest letter in the array (requires wrap around).
- Target is less than the smallest letter.
- Target is equal to the largest letter.
- All letters in the array are the same (per constraints, array will have at least two distinct letters).
- Array size is minimum allowed (2 elements).
- Consecutive duplicate letters (not possible per constraints but clarify).

### Solution

```python
def nextGreatestLetter(letters, target):
    left, right = 0, len(letters) - 1
    # Use binary search to find the smallest letter > target
    while left <= right:
        mid = (left + right) // 2
        if letters[mid] <= target:
            left = mid + 1  # Look to the right
        else:
            right = mid - 1  # Narrow search to left side
    # If left goes past end, wrap using modulo
    return letters[left % len(letters)]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Binary search halves the range with each step, so the overall time used is proportional to log₂n.
- **Space Complexity:** O(1)  
  Only a few integer variables are used regardless of input size; no extra arrays are created.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could contain duplicate letters?  
  *Hint: How would you alter the logic to not return a duplicate of the target if allowed?*

- Could you solve it in O(1) time if there are constraints on the input size or letters (for example, only 26 letters)?  
  *Hint: Consider a lookup table or bitmap since there are only 26 lowercase letters.*

- How would you implement the function if the input array was not sorted?  
  *Hint: Would brute-force be the only way, or could you use extra space to preprocess?*

### Summary
This problem uses the classic **binary search pattern** with a twist (circular array wrap-around). This pattern is common anywhere you need to efficiently locate insert positions or boundaries in sorted arrays, like searching for the "next" unique element, lower_bound/upper_bound problems, or handling rotations. The solution demonstrates efficient traversal with minimal auxiliary space.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Count Elements With Strictly Smaller and Greater Elements (count-elements-with-strictly-smaller-and-greater-elements) (Easy)