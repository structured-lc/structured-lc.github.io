### Leetcode 1570 (Medium): Dot Product of Two Sparse Vectors [Practice](https://leetcode.com/problems/dot-product-of-two-sparse-vectors)

### Description  
Given two vectors of equal length—where most elements are 0 (i.e., they are *sparse vectors*)—efficiently compute their dot product.  
Instead of storing all elements, design a way to store and compute with only the nonzero entries, since multiplying by zeros has no effect and wastes computation.

You must implement a `SparseVector` class:
- `SparseVector(nums)`: Initializes the object with the vector `nums`.
- `dotProduct(vec)`: Computes the dot product between this vector and another `SparseVector` object.

The **dot product** of two vectors is the sum of products of their corresponding entries:  
result = v₀ × w₀ + v₁ × w₁ + ... + vₙ₋₁ × wₙ₋₁

### Examples  

**Example 1:**  
Input: `nums1 = [1,0,0,2,3]`, `nums2 = [0,3,0,4,0]`  
Output: `8`  
*Explanation: v1 = SparseVector(nums1), v2 = SparseVector(nums2).  
v1.dotProduct(v2) = 1×0 + 0×3 + 0×0 + 2×4 + 3×0 = 8*

**Example 2:**  
Input: `nums1 = [0,1,0,0,0]`, `nums2 = [0,0,0,0,2]`  
Output: `0`  
*Explanation: Only one pair of entries are both nonzero, but their indices do not match. All products are 0.*

**Example 3:**  
Input: `nums1 = [0,1,0,0,2,0,0]`, `nums2 = [1,0,0,0,3,0,4]`  
Output: `6`  
*Explanation: Only index 4 is nonzero in both (2×3=6), all other products are 0.*

### Thought Process (as if you’re the interviewee)  
First, the naive approach is to simply iterate through both arrays and sum up the product at each index, even if one or both entries are zero. However, since the vectors are *sparse*, most entries contribute nothing, making this highly inefficient for large inputs.

To optimize:
- Since zeros contribute nothing, store only nonzero values and their indices.
- Use a dictionary, mapping index → value, to keep only nonzero elements.  
- When computing the dot product, iterate over the nonzero indices in one vector, and only look up those indices in the other vector—if present, multiply and add; otherwise, skip.
- For best efficiency, always iterate the smaller dictionary.

Tradeoffs:  
- Dictionary-based storage is much more space-efficient for very sparse data.
- Dot product time is linear in the number of nonzero elements rather than vector length.

### Corner cases to consider  
- Both vectors are entirely zero — dot product is 0.
- All nonzero entries are at disjoint indices — dot product is 0.
- Single-element vectors.
- Vectors with only one nonzero entry each, but at different indices.
- Very long vectors with only a handful of nonzero elements.
- Negative numbers.

### Solution

```python
class SparseVector:
    def __init__(self, nums):
        # Store only the nonzero entries, as {index: value}
        self.data = {}
        for i, val in enumerate(nums):
            if val != 0:
                self.data[i] = val

    def dotProduct(self, vec):
        # Compute dot product by iterating just over nonzero indices
        # Always loop over the vector with fewer nonzero entries
        if len(self.data) > len(vec.data):
            return vec.dotProduct(self)

        result = 0
        for idx, val in self.data.items():
            if idx in vec.data:
                result += val * vec.data[idx]
        return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For dot product, O(k), where k is the number of nonzero elements in the smaller vector (since we only process indices present in both vectors, and skip zero entries).
- **Space Complexity:**  
  O(nz), where nz is the number of nonzero entries in the input vector (for dictionary storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if one vector is dense and the other is sparse?  
  *Hint: Store just one vector in sparse format; scan the dense vector only for indices present in the sparse one for best efficiency.*

- What if the vectors are extremely large and cannot fit in memory?  
  *Hint: Use streaming or external storage; process in chunks or iterate over known nonzero indices only.*

- How would you support addition/subtraction efficiently for sparse vectors?  
  *Hint: Use two pointers or set union of indices for element-wise operations, only storing nonzero results.*

### Summary
This approach uses the **dictionary storage pattern** for sparse arrays—keeping only nonzero entries—which is common for sparsity optimization problems and is widely applicable in machine learning and compressed storage.  
The core idea is to leverage the sparsity to optimize both memory and computation, avoiding unnecessary work with zero entries. This pattern also generalizes to operations like addition, norm, and finding overlaps in sparse data.