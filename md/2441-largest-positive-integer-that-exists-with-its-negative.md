### Leetcode 2441 (Easy): Largest Positive Integer That Exists With Its Negative [Practice](https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative)

### Description  
You are given an integer array that contains no zeros. Find the largest positive integer `k` such that both `k` and `-k` exist in the array. If no such integer exists, return -1.  
Essentially, look through the array for numbers where both the positive and negative form are present, and report the largest possible such number.

### Examples  

**Example 1:**  
Input: `[-1,2,-3,3]`  
Output: `3`  
*Explanation: The value 3 exists, and -3 also exists, so k=3. No positive value larger than 3 has its negative in the array.*

**Example 2:**  
Input: `[-1,10,6,7,-7,1]`  
Output: `7`  
*Explanation: Both 1 and 7 have their negatives present, but 7 is the largest such integer.*

**Example 3:**  
Input: `[-10,8,6,7,-2,-3]`  
Output: `-1`  
*Explanation: There is no positive integer in the array for which both the number and its negative are present.*

### Thought Process (as if you’re the interviewee)  
- A brute-force approach would be to check for every positive integer in the array if its negative counterpart is also present. For each number k, see if -k exists. Track the largest such k.
- To do this efficiently, I can use a set to store all the numbers for constant-time existence checks. Iterate the array, and for each positive number, check if its negative is also in the set. Keep track of the maximum such value found.
- This approach only requires one pass through the array to build the set and another pass to check, or you can do both operations in a single pass for even better efficiency.
- The trade-off: using a set takes O(n) extra space, but allows for an O(n) time solution, which is optimal for simple array scans.

### Corner cases to consider  
- Empty array: return -1 immediately.
- No pairs with both k and -k present: return -1.
- Only negative numbers or only positive numbers: return -1.
- Duplicate numbers (shouldn’t matter, just need presence).
- Large arrays near input limits.

### Solution

```python
def findMaxK(nums):
    # Step 1: Store all numbers in a set for fast lookup
    num_set = set(nums)
    max_k = -1
    
    # Step 2: Iterate, check for positive numbers with their negative present
    for num in nums:
        # Only care about positive numbers
        if num > 0 and -num in num_set:
            max_k = max(max_k, num)
    return max_k
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We build a set in O(n), and the main loop is O(n), with constant time lookups.
- **Space Complexity:** O(n) — The set can store up to n elements, which is proportional to the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve it without using extra space?
  *Hint: Try sorting the array first and use two pointers, but expect worse time performance.*
- What if zeros were allowed in the array?
  *Hint: Be careful, as 0 would need both positive and negative counterparts, but 0 is considered its own negative.*
- How would you extend this to find all positive integers with their negatives?
  *Hint: Instead of tracking only the max, collect all valid k values.*

### Summary
This is a classic example of the *hash set* lookup pattern, commonly used in interview problems requiring fast existence checks or pair-finding (like "two-sum"). Efficient use of a set allows O(n) time and space, and the approach readily applies to problems seeking matching pairs or symmetries in arrays.