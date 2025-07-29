### Leetcode 852 (Medium): Peak Index in a Mountain Array [Practice](https://leetcode.com/problems/peak-index-in-a-mountain-array)

### Description  
You are given an array `arr` of integers that forms a **mountain array**: the values strictly increase up to a certain point (the peak), and then strictly decrease. The array has at least 3 elements, and there exists some index *i* (with 0 < i < arr.length - 1) where arr < arr[1] < ... < arr[i-1] < arr[i] > arr[i+1] > ... > arr[arr.length-1].  
Your task is to find and return the **index of the peak element** — the point where the increasing sequence switches to a decreasing sequence. Aim for a solution faster than linear time.

### Examples  

**Example 1:**  
Input: `arr = [0,1,0]`  
Output: `1`  
*Explanation: arr[1]=1 is greater than neighbors arr=0 and arr[2]=0. So, the peak is at index 1.*

**Example 2:**  
Input: `arr = [0,2,1,0]`  
Output: `1`  
*Explanation: arr[1]=2 is greater than arr=0 and arr[2]=1. So, the peak is at index 1.*

**Example 3:**  
Input: `arr = [0,10,5,2]`  
Output: `1`  
*Explanation: arr[1]=10 is greater than arr=0 and arr[2]=5. Index 1 is the peak (maximum value).*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  The simplest approach is to **scan through array linearly** and return the first index *i* where arr[i] > arr[i-1] and arr[i] > arr[i+1].  
  - Time: O(n)  
  - While this works, the problem asks for `O(log n)` time, suggesting binary search can be applied.

- **Binary Search Optimization:**  
  Since the array **strictly increases up to the peak, then strictly decreases**, the condition around every mid is:
    - If arr[mid] < arr[mid+1], we're on the **uphill**, so the peak must be **to the right** (set low = mid + 1).
    - If arr[mid] > arr[mid+1], we're on the **downhill or at the peak**, so the peak is **at mid or to the left** (set high = mid).
  - We keep narrowing the search space until low == high, at which point both point to the peak index.

- **Why binary search is right:**  
  The mountain structure is strictly unimodal, so binary search is guaranteed to find the single peak in logarithmic time.

### Corner cases to consider  
- The peak cannot be at index 0 or at the last index, due to the guaranteed mountain structure.
- Minimum length is 3, so input is never empty, and slicing is always safe.
- All values are unique around the peak (strictly increasing then strictly decreasing).
- No need to handle equal adjacent or flat peaks.

### Solution

```python
def peakIndexInMountainArray(arr):
    # Edge case: problem guarantees mountain, so arr has at least 3 elements.
    left = 1
    right = len(arr) - 2  # peak cannot be at index 0 or last index.
    while left < right:
        mid = (left + right) // 2
        # Compare to the right neighbor
        if arr[mid] < arr[mid + 1]:
            # Ascending: move right
            left = mid + 1
        else:
            # Descending or at peak: move left (including current mid)
            right = mid
    return left  # or right, both point to the peak index.
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Binary search halves the search space at each iteration (n = arr.length).

- **Space Complexity:** O(1)  
  Only a constant number of pointers (left, right, mid), no extra storage or recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the mountain array property was not guaranteed? How would you find a local peak?
  *Hint: Consider generic peak finding using binary search but check both sides at each step.*

- Can you return the value of the peak rather than its index?
  *Hint: Just return arr[index] instead of index.*

- How would you modify your solution if the mountain array could have plateaus (equal values)?
  *Hint: Handle arr[mid] == arr[mid+1], possibly adjust bounds or linear scan nearby.*

### Summary
This problem uses the **binary search** pattern on a *unimodal* array to efficiently find the index of the maximum (peak) element. The approach exploits the strictly increasing then strictly decreasing structure, making it a classic application of binary search to geometric or monotonic sequences, also used in problems like "Find Peak Element" or searching for a maximum in bitonic arrays.