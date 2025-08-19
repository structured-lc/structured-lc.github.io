### Leetcode 1675 (Hard): Minimize Deviation in Array [Practice](https://leetcode.com/problems/minimize-deviation-in-array)

### Description  
Given an array of positive integers, you can perform these operations any number of times:
- If the number is **even**, you can divide it by 2.
- If the number is **odd**, you can multiply it by 2.

Your goal is to **minimize the deviation**, which means minimizing the difference between the maximum and minimum elements in the array after any sequence of allowed operations.

**You must return the smallest possible deviation you can achieve.**

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4]`  
Output: `1`  
*Explanation:  
- Multiply 1 → 2: [2,2,3,4]  
- Divide 4 → 2: [2,2,3,2]  
- Now, max - min = 3 - 2 = 1 (which is minimum possible).*

**Example 2:**  
Input: `nums = [4,1,5,20,3]`  
Output: `3`  
*Explanation:  
- Multiply 1 → 2: [4,2,5,20,3]  
- Multiply 3 → 6: [4,2,5,20,6]  
- Divide 20 → 10 → 5: [4,2,5,5,6]  
- Now, max - min = 6 - 2 = 4, or you can try [4,2,5,5,3] and so on, eventually the minimum possible deviation is 3.*

**Example 3:**  
Input: `nums = [2,10,8]`  
Output: `3`  
*Explanation:  
- Divide 10 → 5: [2,5,8]  
- Divide 8 → 4: [2,5,4]  
- Now, max - min = 5 - 2 = 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try every possible combination of allowed operations on each number. There are too many possibilities—exponential in input size and not practical.

- **Optimized Approach:**  
  - We note:
    - Any **odd** number can *only* be increased (multiplied by 2 *once*) to become even.
    - Any **even** number can be repeatedly halved (until it becomes odd).
  - Therefore, the **maximum starting value** for all numbers is: for odds, double them once; for evens, keep as-is.
  - To minimize deviation:
    - Push all values (after making odds even) into a **max-heap**.
    - Track the **current minimum**.
    - Repeatedly take the max from the heap, try to halve it (only if it's even), and push the result back.
    - Update the current minimum any time we push a new value.
    - When the max is odd (can't halve anymore), we stop.
    - The minimum deviation is the smallest observed (max - min) over all steps.
  - This approach uses a heap (priority queue) for efficient max element extraction and is much faster than brute-force.
  - **Why this works:** By always reducing the current maximum and tracking the current minimum, we efficiently explore all paths that minimize the difference between largest and smallest numbers.

### Corner cases to consider  
- Empty array input (though per problem constraints, the input seems to always be non-empty).
- Arrays where all elements are the same (deviation will be 0).
- Arrays of all odds, all evens.
- Minimum and maximum possible integer values in the array.

### Solution

```python
import heapq

def minimumDeviation(nums):
    # Step 1: Make all numbers even (multiply odds by 2)
    arr = []
    for num in nums:
        if num % 2 == 1:
            arr.append(num * 2)
        else:
            arr.append(num)
            
    # Step 2: Build a max heap of the values (negate for min-heap)
    heap = [-x for x in arr]
    heapq.heapify(heap)
    # Step 3: Track the current minimum value in the array
    curr_min = min(arr)
    # Initialize answer with current max - min
    min_deviation = -heap[0] - curr_min

    # Step 4: Keep reducing the maximum (if even) to minimize deviation
    while True:
        curr_max = -heapq.heappop(heap)
        min_deviation = min(min_deviation, curr_max - curr_min)
        # If current max is even, it can be reduced
        if curr_max % 2 == 0:
            next_val = curr_max // 2
            heapq.heappush(heap, -next_val)
            curr_min = min(curr_min, next_val)
        else:
            # If it's odd, can't reduce further, so stop
            break

    return min_deviation
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(C)), where n is the length of `nums` and C is the maximum value in `nums`.
  - For each number, you potentially halve it log₂(C) times.
  - Each heap operation (push/pop) is log n, and you do these up to n × log₂(C) times.

- **Space Complexity:** O(n)
  - Used for the heap and storing modified array elements.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the sequence of operations that gives the minimal deviation?  
  *Hint: Track parents or the transformation path for each heap value.*

- Can you do it in-place with O(1) auxiliary space?  
  *Hint: Try to operate directly on indices and avoid extra containers if possible.*

- How would you handle it if negative or zero numbers were allowed?  
  *Hint: Think about what happens to the halving/doubling process in those cases, and whether the deviation rules change.*

### Summary
This problem demonstrates the "heap for dynamic max/min tracking" pattern—a greedy approach often used when the goal is to repeatedly minimize (or maximize) a range metric after element-wise choices. Transforming all numbers to even where possible, and always reducing the current maximum while monitoring the minimum, leads to an efficient solution. This pattern appears in scheduling, resource balancing, and optimization problems involving arrays and dynamic choices.

### Tags
Array(#array), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
