### Leetcode 1979 (Easy): Find Greatest Common Divisor of Array [Practice](https://leetcode.com/problems/find-greatest-common-divisor-of-array)

### Description  
Given an array of integers, return the **greatest common divisor (GCD) of the smallest and largest number** in the array.  
GCD is the largest positive integer that divides both numbers without leaving a remainder.

### Examples  

**Example 1:**  
Input: `[2, 5, 6, 9, 10]`  
Output: `2`  
*Explanation: The smallest number is 2 and the largest is 10. GCD(2, 10) is 2.*

**Example 2:**  
Input: `[7, 5, 6, 8, 3]`  
Output: `1`  
*Explanation: The smallest number is 3 and the largest is 8. GCD(3, 8) is 1.*

**Example 3:**  
Input: `[3, 3]`  
Output: `3`  
*Explanation: The smallest and largest are both 3. GCD(3, 3) is 3.*


### Thought Process (as if you’re the interviewee)  
First, I need to find the smallest and largest numbers in the array. This can be done with a single pass using two variables, or using built-in min and max functions.  
After finding the smallest and largest, I need to compute the GCD of these two numbers. This can be implemented directly using the Euclidean algorithm, which iteratively computes gcd(a, b) = gcd(b, a % b) until b reaches zero.  
Using built-in functions like min/max and math.gcd is fast, but since library shortcuts are discouraged in interviews, I’ll implement the Euclidean algorithm manually.  
The overall problem is straightforward and highly efficient since only two numbers are involved for the GCD calculation.  
Trade-offs: Since the array could be large (up to 1000 elements), a simple scan to find min and max is optimal (O(n)). The GCD step is negligible in comparison.

### Corner cases to consider  
- Array of length 2 (minimum input size)
- All numbers are the same (GCD equal to that number)
- Minimum element equal to 1 (GCD is always 1)
- Large numbers, including numbers at the bounds (e.g., 1 and 1000)
- Negative numbers are not possible due to constraints (all nums[i] ≥ 1)

### Solution

```python
def findGCD(nums):
    # Step 1: Find the smallest and largest numbers in the array
    smallest = nums[0]
    largest = nums[0]
    for num in nums:
        if num < smallest:
            smallest = num
        if num > largest:
            largest = num

    # Step 2: Compute GCD using Euclidean algorithm
    def gcd(a, b):
        # Continue until b is zero
        while b != 0:
            a, b = b, a % b
        return a

    return gcd(smallest, largest)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We make a single pass to find smallest and largest (O(n)), then Euclidean GCD runs in O(log(min(a, b))) which is O(1) for the input bounds.
- **Space Complexity:** O(1)  
  Extra space is constant: a couple of variables for min, max, and the GCD calculation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the question asked to find the GCD of all numbers in the array?  
  *Hint: How would you iteratively reduce the array using the GCD operation?*

- How can you optimize for very large arrays or numbers?  
  *Hint: Memory is not an issue, but consider integer overflow and time cost of repeated GCD calculations.*

- What if the input may contain zeros or negatives?  
  *Hint: How does GCD behave for zeros and negative values? Should you validate input?*

### Summary
This problem uses the classic **Euclidean algorithm** and array scanning techniques. The coding pattern—find extremes, then reduce with a classic algorithm—appears in problems involving LCM/GCD, array min/max, and more. The core takeaway: reduce the input array to the essential values for computing the answer, then solve with a well-known efficient method. This pattern is common in computational math and subarray/subsequence optimizations.