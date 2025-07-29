### Leetcode 1299 (Easy): Replace Elements with Greatest Element on Right Side [Practice](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side)

### Description  
Given an array of integers, for each index replace the element with the greatest element among the elements to its right.  
For the last element, since there’s no element to its right, replace it with -1.  
You must modify the array in-place and return it.

### Examples  

**Example 1:**  
Input: `arr = [17,18,5,4,6,1]`  
Output: `[18,6,6,6,1,-1]`  
*Explanation:*
- For 17, the greatest on right is 18.
- For 18, it's 6.
- For 5, it's 6.
- For 4, it's 6.
- For 6, it's 1.
- For 1 (last element), it's -1.

**Example 2:**  
Input: `arr = `  
Output: `[-1]`
*Explanation:*  
- Single element, so just -1.

**Example 3:**  
Input: `arr = [4,3,2,1]`  
Output: `[3,2,1,-1]`
*Explanation:*  
- 4 → right elements [3,2,1] → max is 3  
- 3 → right [2,1] → max is 2  
- 2 → right [1] → max is 1  
- 1 is last → -1

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each element `arr[i]`, check all elements to its right (`arr[i+1:]`) and find the max. Set `arr[i]=max(arr[i+1:])`. This requires two nested loops: overall O(n²) time.
- **Optimize:**  
  Instead, traverse from right to left. Keep track of the "max on the right" as we go.  
  - Start with `max_right = -1` (since last element must be -1).
  - For each i from n-1 to 0:
    - Store current `arr[i]`.
    - Replace `arr[i]` with `max_right`.
    - Update `max_right` = max(`max_right`, stored value).
  - This uses only one pass: O(n) time, O(1) extra space.
- **Why this way?**  
  - We always know the max to the right by the time we need to update an element.
  - Saves time compared to brute-force, and no extra storage needed.

### Corner cases to consider  
- Empty array (`[]`).  
- Single element (`[x]`).  
- All elements are equal (`[7,7,7]`).  
- Strictly increasing/decreasing arrays.  
- Arrays with negative numbers.  
- Large array (check efficiency/overflow).

### Solution

```python
def replaceElements(arr):
    # Start with greatest on right as -1
    max_right = -1
    # Traverse from right to left
    for i in range(len(arr) - 1, -1, -1):
        # Save current value before overwrite
        current = arr[i]
        # Replace with max_right (greatest to its right)
        arr[i] = max_right
        # Update max_right if needed
        max_right = max(max_right, current)
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Only a single pass over the array (n elements), with constant work per element.
- **Space Complexity:** O(1)  
  No extra data structures, just a few integer variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you're not allowed to modify the input array?  
  *Hint: Return a new array instead of modifying in-place.*

- How would your code change if you had to do the opposite (greatest to the left of each element)?  
  *Hint: Traverse from left to right, use a similar running-max trick.*

- Can you do this for linked lists or streams of data?  
  *Hint: For linked list, need to reverse it or use recursion. For streams, may not be possible without full lookahead.*

### Summary
This problem is a classic example of the "right/left max scan" pattern, useful anytime you need each position to know info about elements in one direction (like running min/max or prefix/suffix products).  
The optimized O(n) one-pass solution uses a backwards traversal and running max tracker, a common and efficient idiom for this class of questions.  
Knowing how to convert O(n²) two-loop scans into a clever single-scan solution is a key array skill for tech interviews.