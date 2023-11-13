#include "test_inc_3.hlsl"      // resolves to folder_2/test_inc_3.hlsl, because of _build/shaders_pc11.blk
#include "test_inc_1.hlsl"      // resolves to test_inc_1.hlsl, because it's in the same folder as this file
#include <test_inc_1.hlsl>      // resolves to folder_1/test_inc_1.hlsl, because of common_inc_dirs.blk
#include <../test_inc_1.hlsl>   // resolves to test_inc_1.hlsl, because of common_inc_dirs.blk
