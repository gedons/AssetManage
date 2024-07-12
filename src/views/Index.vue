<template>
	<section class="dark:bg-gray-100 dark:text-gray-800">
		<div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row ">
			<div class="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
				<img src="../assets/set.jpg" alt="" class="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			</div>
			<div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
				<h1 class="text-5xl font-bold leading-none sm:text-6xl">CPU 
					<span>Instruction Set  </span>Simulator
				</h1>
				<p class="mt-6 mb-8 text-lg sm:mb-12">The CPU Instruction Set Simulator Application is a web-based tool designed to help users understand and visualize the process of converting assembly code
					<br class="hidden md:inline lg:hidden"> into machine code and simulating its execution on a virtual CPU. The application consists of two main components: an assembler and a simulator.           
				</p>
				<div class="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
					<router-link to="/assembler" rel="noopener noreferrer"  class="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">Get Started</router-link>
					
				</div>
			</div>
		</div>
	</section>

  
        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div class="flex flex-col mb-16 sm:text-center sm:mb-0">
              <a href="/" class="mb-6 sm:mx-auto">
                <div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                  <svg class="w-10 h-10 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                    <polygon stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                  </svg>
                </div>
              </a>
              <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                 More Info
                </h2>
                <p class="text-base text-gray-700 md:text-lg">
                  The assembler translates human-readable assembly language into machine code, while the simulator executes the machine code and displays the state of the CPU registers and memory.
                </p>
              </div>
              <div>
                <router-link
                  to="/assembler"
                  class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-900 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  Get started
                </router-link>
              </div>
            </div>
          </div>
        </div>
      
</template>