### Leetcode 2422 (Medium): Merge Operations to Turn Array Into a Palindrome [Practice](https://leetcode.com/problems/merge-operations-to-turn-array-into-a-palindrome)

### Description  
You are given an array of positive integers. In one operation, you can select any two **adjacent** elements and merge them into their sum, thereby reducing the length of the array by 1.  
Your task is to find the **minimum number of such merge operations** required to turn the array into a palindrome (an array that reads the same forward and backward).

### Examples  

**Example 1:**  
Input: `nums = [4,3,2,1,2,3,4]`  
Output: `0`  
*Explanation: The array is already a palindrome, so no merges are needed.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `3`  
*Explanation:  
- Merge 1+2 → [3,3,4] (operations = 1)  
- Merge 3+3 → [6,4] (operations = 2)  
- Merge 6+4 →  (operations = 3)  
Now it's a palindrome.*

**Example 3:**  
Input: `nums = [1,4,5,1]`  
Output: `1`  
*Explanation:  
- Merge 4+5 → [1,9,1] (operations = 1)  
Now, [1,9,1] is a palindrome.*

### Thought Process (as if you’re the interviewee)  

To make the array a palindrome, for every pair of elements symmetric about the center, the values must be equal.  
If the left and right elements are already equal, just move inward. If not, we need to merge on the side with the smaller value so that it can “catch up” to the larger value in the hopes of matching. We repeat this until the left and right pointers meet or cross.

Brute-force:  
Try all possible merge sequences; this is exponential and infeasible.

Optimized:  
Use **two pointers** (left at start, right at end):  
- If nums[left] == nums[right], move both pointers inward.
- If nums[left] < nums[right], merge nums[left] with nums[left+1], increment left, and increase op count.
- If nums[right] < nums[left], merge nums[right] with nums[right-1], decrement right, and increase op count.

This works greedily: always merging the smaller, since merging creates a larger number and "keeps up" with the greater value on the other side. The process is O(n), because in each step, one pointer moves.

### Corner cases to consider  
- Empty array: Already a palindrome, needs 0 merges.
- Single-element array: 0 merges.
- Array already a palindrome: 0 merges.
- All elements the same: 0 merges.
- Array with length 2 of unequal elements: 1 merge.
- Merging may cascade several times at the same index for multiple small elements catching up to a larger one.

### Solution

```python
def minimumOperations(nums):
    left = 0
    right = len(nums) - 1
    operations = 0
    while left < right:
        if nums[left] == nums[right]:
            # Already matching; move both pointers inward
            left += 1
            right -= 1
        elif nums[left] < nums[right]:
            # Merge left side: combine nums[left] with nums[left+1]
            nums[left + 1] += nums[left]
            left += 1
            operations += 1
        else:
            # Merge right side: combine nums[right] with nums[right-1]
            nums[right - 1] += nums[right]
            right -= 1
            operations += 1
    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each merge and pointer movement is O(1), and we process at most n steps.
- **Space Complexity:** O(1) extra (if allowed to modify input in-place); if not, use a copy (O(n)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only merge on one side?  
  *Hint: How do the choices affect the minimal number of operations?*

- What if the merges must always keep the array length even?  
  *Hint: Can every array with even length be made a palindrome under this rule?*

- Can you do it without modifying the input array?  
  *Hint: Use left/right pointers and temporary sums instead of in-place mutations.*

### Summary
This problem is a classic **two-pointer greedy** application, often seen in palindrome and symmetric pair problems. The approach generalizes to any problem requiring adjacent merges to achieve symmetry. This method (merge smaller side, move pointers) is also common for tasks such as minimizing operations in array transformations for symmetry or monotonicity.


### Flashcard
Merge elements symmetrically to make the array a palindrome.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy)

### Similar Problems
